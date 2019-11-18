const {
  UserInputError
} = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js");
const Event = require("../../models/Event.js");
const Request = require("../../models/Request.js");

require("dotenv").config();

const {
  validateRegisterInput,
  validateLoginInput,
  validateRedeemPointsInput
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

      async getUser(_, { userId }) {
        try {
          var user = await User.findById(userId);

          const users = await User.find();
          const fallBelowUsers = await User.find()
            .where("fallPoints")
            .lt(user.fallPoints);
          const springBelowUsers = await User.find()
            .where("springPoints")
            .lt(user.springPoints);
          const summerBelowUsers = await User.find()
            .where("summerPoints")
            .lt(user.summerPoints);

          const fallPercentile = Math.trunc(
            (fallBelowUsers.length / users.length) * 100
          );
          const springPercentile = Math.trunc(
            (springBelowUsers.length / users.length) * 100
          );
          const summerPercentile = Math.trunc(
            (summerBelowUsers.length / users.length) * 100
          );

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
            fallPercentile: fallPercentile,
            springPercentile: springPercentile,
            summerPercentile: summerPercentile,
            createdAt: user.createdAt,
            permission: user.permission,
            listServ: user.listServ,
            events: user.events,
            classes: user.classes
          };

          if (newUser) {
            return newUser;
          } else {
            throw new Error("User not found.");
          }
        } catch (err) {
          throw new Error(err);
        }
      },

      async getMajorStat() {
        try {
          const data = await User.aggregate([{
              $group: {
                _id: '$major',
                value: {
                  $sum: 1
                }
              }
            },
            {
              $sort: {
                value: -1
              }
            }
          ]);

          if(data){
            return data;
          } else{
            throw new Error("Data not found.");
          }
        } catch (err) {
          throw new Error(err);
        }
      },

      async getYearStat() {
        try {
          const data = await User.aggregate([{
              $group: {
                _id: '$year',
                value: {
                  $sum: 1
                }
              }
            },
            {
              $sort: {
                _id: 1
              }
            }
          ]);

          if(data){
            return data;
          } else{
            throw new Error("Data not found.");
          }
        } catch (err) {
          throw new Error(err);
        }
      },

      async getCountryStat() {
        try {
          const data = await User.aggregate([{
              $group: {
                _id: '$country',
                value: {
                  $sum: 1
                }
              }
            },
            {
              $sort: {
                value: -1
              }
            }
          ]);

          if(data){
            return data;
          } else{
            throw new Error("Data not found.");
          }
        } catch (err) {
          throw new Error(err);
        }
      },

      async getSexStat() {
        try {
          const data = await User.aggregate([{
              $group: {
                _id: '$sex',
                value: {
                  $sum: 1
                }
              }
            },
            {
              $sort: {
                value: -1
              }
            }
          ]);

          if(data){
            return data;
          } else{
            throw new Error("Data not found.");
          }
        } catch (err) {
          throw new Error(err);
        }
      },

      async getEthnicityStat() {
        try {
          const data = await User.aggregate([{
              $group: {
                _id: '$ethnicity',
                value: {
                  $sum: 1
                }
              }
            },
            {
              $sort: {
                value: -1
              }
            }
          ]);

          if(data){
            return data;
          } else{
            throw new Error("Data not found.");
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
            events: [],
            classes: []
          });

          const res = await newUser.save();

          var time = "24h";

          const token = generateToken(res, time);

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
              classes: user.classes,
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
        }
      }
    };