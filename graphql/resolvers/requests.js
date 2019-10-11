const {
  UserInputError
} = require("apollo-server");
const Request = require("../../models/Request.js");
const Event = require("../../models/Event.js");
const User = require("../../models/User.js");
const {
  validateEmailInput
} = require("../../util/validators");

const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");

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
    async getRequests() {
      try {
        const requests = await Request.find().sort({
          createdAt: 1
        });
        return requests;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async rejectRequest(
      _, {
        approveRejectRequestInput: {
          username,
          eventName
        }
      }
    ) {
      const res = await Request.deleteOne({
        username: username,
        eventName: eventName
      });

      const requests = await Request.find().sort({
        createdAt: 1
      });

      return requests;
    },

    async approveRequest(
      _, {
        approveRejectRequestInput: {
          username,
          eventName
        }
      }
    ) {
      const event = await Event.findOne({
        name: eventName
      });
      const user = await User.findOne({
        username
      });

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

      await Event.findOneAndUpdate({
        name: eventName
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

      const res = await Request.deleteOne({
        username: username,
        eventName: eventName
      });

      const requests = await Request.find().sort({
        createdAt: 1
      });

      return requests;
    },

    async resetPassword(
      _, {
        email
      }
    ) {
      //error checking
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
      const token = generateToken(user, time);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `shpeuf.website@gmail.com`,
          pass: `Shpe2020`,
        },
      });

      const mailOptions = {
        from: 'shpeuf.website@gmail.com',
        to: `${user.email}`,
        subject: 'Reset Password',
        text: 'You have requested the reset of the password for your account for shpe.co\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
          `http://localhost:3031/reset/${token}\n\n` +
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

      return user;
    }
  }
};
