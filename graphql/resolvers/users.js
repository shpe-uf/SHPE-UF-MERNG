const {
  UserInputError
} = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const User = require("../../models/User.js");
const Event = require("../../models/Event.js");
const Request = require("../../models/Request.js");


require("dotenv").config();

const {
  validateRegisterInput,
  validateLoginInput,
  validateRedeemPointsInput,
  validateEmailInput,
  validatePasswordInput
} = require("../../util/validators");

function generateToken(user, time) {
  return jwt.sign({
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET, {
      expiresIn: time
    }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find().sort({
          lastName: 1,
          firstName: 1
        });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getUser(_, {
      userId
    }) {
      try {
        const user = await User.findById(userId);

        if (user) {
          return user;
        } else {
          throw new Error("User not found.");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async login(_, {
      username,
      password,
      remember
    }) {
      username = username.toLowerCase();

      const {
        errors,
        valid
      } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors.", {
          errors
        });
      }

      const user = await User.findOne({
        username
      });

      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("User not found.", {
          errors
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials.";
        throw new UserInputError("Wrong credentials.", {
          errors
        });
      }

      //Eduardo
      const isConfirmed = user.confirmed;

      if (!isConfirmed) {
        errors.general = "User not confirmed.";
        throw new UserInputError("User not confirmed.", {
          errors
        });
      }

      time = remember === "true" || remember === true ? "30d" : "24h";
      const token = generateToken(user, time);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },

    async register(
      _, {
        registerInput: {
          firstName,
          lastName,
          major,
          year,
          graduating,
          country,
          ethnicity,
          sex,
          username,
          email,
          password,
          confirmPassword,
          listServ
        }
      }
    ) {
      username = username.toLowerCase();

      const {
        valid,
        errors
      } = validateRegisterInput(
        firstName,
        lastName,
        major,
        year,
        graduating,
        country,
        ethnicity,
        sex,
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", {
          errors
        });
      }

      isUsernameDuplicate = await User.findOne({
        username
      });

      if (isUsernameDuplicate) {
        throw new UserInputError(
          "An account with that username already exists.", {
            errors: {
              username: "An account with that username already exists."
            }
          }
        );
      }

      isEmailDuplicate = await User.findOne({
        email
      });

      if (isEmailDuplicate) {
        throw new UserInputError(
          "An account with that e-mail already exists.", {
            errors: {
              email: "An account with that email already exists."
            }
          }
        );
      }

      password = await bcrypt.hash(password, 12);
      listServ = listServ === "true" || listServ === true ? true : false;

      const newUser = new User({
        firstName,
        lastName,
        major,
        year,
        graduating,
        country,
        ethnicity,
        sex,
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
        points: 0,
        fallPoints: 0,
        springPoints: 0,
        summerPoints: 0,
        permission: "User",
        listServ,
        events: []
      });

      const res = await newUser.save();

      var time = "24h";

      const token = generateToken(res, time);

      const user = await User.findOne({ email });

      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: `${user.email}`,
        subject: 'Confirm Email',
        text: 'Thank you for registering, please click in the link below to complete your registration\n\n' +
          `${process.env.CLIENT_ORIGIN}/confirm/${user._id}\n\n`
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },

    async redeemPoints(
      _, {
        redeemPointsInput: {
          code,
          username
        }
      }
    ) {
      code = code
        .toLowerCase()
        .trim()
        .replace(/ /g, "");

      const {
        valid,
        errors
      } = validateRedeemPointsInput(code);

      if (!valid) {
        throw new UserInputError("Errors", {
          errors
        });
      }

      const event = await Event.findOne({
        code
      });

      const user = await User.findOne({
        username
      });

      if (!event) {
        errors.general = "Event not found.";
        throw new UserInputError("Event not found.", {
          errors
        });
      }

      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("User not found.", {
          errors
        });
      }

      if (Date.parse(event.expiration) < Date.now()) {
        errors.general = "Event code expired";
        throw new UserInputError("Event code expired", {
          errors
        });
      }

      user.events.map(userEvent => {
        if (String(userEvent.name) == String(event.name)) {
          errors.general = "Event code already redeemed.";
          throw new UserInputError("Event code already redeemed.", {
            errors
          });
        }
      });

      if (event.request) {
        const request = await Request.findOne({
          eventName: event.name,
          username: user.username
        });

        if (request) {
          errors.general = "Event code already sent for approval.";
          throw new UserInputError("Event code already sent for approval.", {
            errors
          });
        }

        const newRequest = new Request({
          eventName: event.name,
          category: event.category,
          points: event.points,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          createdAt: new Date().toISOString()
        });

        const res = await newRequest.save();

        var newUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          major: user.major,
          year: user.year,
          graduating: user.graduating,
          country: user.country,
          ethnicity: user.ethnicity,
          sex: user.sex,
          ethnicity: user.ethnicity,
          points: user.points,
          fallPoints: user.fallPoints,
          springPoints: user.springPoints,
          summerPoints: user.summerPoints,
          createdAt: user.createdAt,
          permission: user.permission,
          listServ: user.listServ,
          events: user.events,
          message: "Event code has been sent for approval."
        };

        return newUser;
      } else {
        var pointsIncrease = {};

        if (event.semester === "Fall Semester") {
          pointsIncrease = {
            points: event.points,
            fallPoints: event.points
          };
        } else if (event.semester === "Spring Semester") {
          pointsIncrease = {
            points: event.points,
            springPoints: event.points
          };
        } else if (event.semester === "Summer Semester") {
          pointsIncrease = {
            points: event.points,
            summerPoints: event.points
          };
        } else {
          errors.general = "Invalid event.";
          throw new UserInputError("Invalid event.", {
            errors
          });
        }

        var updatedUser = await User.findOneAndUpdate({
          username
        }, {
          $push: {
            events: {
              $each: [{
                name: event.name,
                category: event.category,
                createdAt: event.createdAt,
                points: event.points
              }],
              $sort: {
                createdAt: 1
              }
            }
          },
          $inc: pointsIncrease
        }, {
          new: true
        });

        updatedUser.message = "";

        await Event.findOneAndUpdate({
          code
        }, {
          $push: {
            users: {
              $each: [{
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email
              }],
              $sort: {
                lastName: 1,
                firstName: 1
              }
            }
          },
          $inc: {
            attendance: 1
          }
        }, {
          new: true
        });

        return updatedUser;
      }
    },


    async confirmUser(
      _, {
        id
      }
    ) {

      const user = await User.findOneAndUpdate({ _id: id }, {
        confirmed: true
      });

      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("User not found.", {
          errors
        });
      }

      return user;

    },


    async forgotPassword(
      _, {
        email
      }
    ) {

      const {
        errors,
        valid
      } = validateEmailInput(email);
      if (!valid) {
        throw new UserInputError("Errors.", {
          errors
        });
      }

      const user = await User.findOne({
        email
      });
      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("User not found.", {
          errors
        });
      }

      var time = "24h";
      var token = generateToken(user, time);
      var uniqueToken = false;

      while (!uniqueToken) {
        const user = await User.findOne({
          token
        });
        if (user) {
          token = generateToken(user, time);
        } else {
          uniqueToken = true;
        }
      }

      const newUser = await User.findOneAndUpdate({
        email
      }, {
        token
      });

      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: `${user.email}`,
        subject: 'Reset Password',
        text: 'You have requested the reset of the password for your account for shpe.com\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
          `${process.env.CLIENT_ORIGIN}/reset/${token}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });

      return {
        ...newUser._doc,
        id: newUser._id,
        token
      };
    },

    async resetPassword(
      _, {
        password,
        confirmPassword,
        token
      }
    ) {
      const {
        errors,
        valid
      } = validatePasswordInput(password, confirmPassword);

      if (!valid) {
        throw new UserInputError("Errors.", {
          errors
        });
      }



      const user = await User.findOne({
        token
      });
      if (!user) {
        errors.general = "Invalid Token";
        throw new UserInputError("Invalid Token", {
          errors
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = await User.findOneAndUpdate({
        email: user.email
      }, {
        password,
        token: ""
      });

      var Token = {
        token: token
      }
      return Token;
    }
  }
};
