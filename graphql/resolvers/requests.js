const { UserInputError } = require("apollo-server");
const Request = require("../../models/Request.js");
const Event = require("../../models/Event.js");
const User = require("../../models/User.js");
const { validateEmailInput } = require("../../util/validators");

module.exports = {
  Query: {
    async getRequests() {
      try {
        const requests = await Request.find().sort({ createdAt: 1 });
        return requests;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async rejectRequest(
      _,
      {
        approveRejectRequestInput: { username, eventName }
      }
    ) {
      const res = await Request.deleteOne({
        username: username,
        eventName: eventName
      });

      const requests = await Request.find().sort({ createdAt: 1 });

      return requests;
    },

    async approveRequest(
      _,
      {
        approveRejectRequestInput: { username, eventName }
      }
    ) {
      const event = await Event.findOne({ name: eventName });
      const user = await User.findOne({ username });

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

      var updatedUser = await User.findOneAndUpdate(
        {
          username
        },
        {
          $push: {
            events: {
              $each: [
                {
                  name: event.name,
                  category: event.category,
                  createdAt: event.createdAt,
                  points: event.points
                }
              ],
              $sort: { createdAt: 1 }
            }
          },
          $inc: pointsIncrease
        },
        {
          new: true
        }
      );

      await Event.findOneAndUpdate(
        {
          name: eventName
        },
        {
          $push: {
            users: {
              $each: [
                {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  email: user.email
                }
              ],
              $sort: { lastName: 1, firstName: 1 }
            }
          },
          $inc: {
            attendance: 1
          }
        },
        {
          new: true
        }
      );

      const res = await Request.deleteOne({
        username: username,
        eventName: eventName
      });

      const requests = await Request.find().sort({ createdAt: 1 });

      return requests;
    },

    async resetPassword(
      _,
      { email }
    ) {
      //error checking
      const { errors, valid } = validateEmailInput(email);
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
      
      return user;
    }
  }
};
