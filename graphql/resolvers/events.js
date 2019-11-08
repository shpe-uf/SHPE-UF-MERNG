const { UserInputError } = require("apollo-server");
const Event = require("../../models/Event.js");
const User = require("../../models/User.js");
const Request = require("../../models/Request.js");

const {
  validateCreateEventInput,
  validateManualInputInput
} = require("../../util/validators");

const categoryOptions = require("../../client/src/assets/options/category.json");
const monthOptions = require("../../client/src/assets/options/month.json");

module.exports = {
  Query: {
    async getEvents() {
      try {
        const events = await Event.find().sort({ createdAt: 1 });
        return events;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async createEvent(
      _,
      {
        createEventInput: { name, code, category, expiration, request, points }
      }
    ) {
      const { valid, errors } = validateCreateEventInput(
        name,
        code,
        category,
        points,
        expiration
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const findPoints = categoryOptions.find(({ key }) => key === category);
      const month = new Date().getMonth();

      code = code
        .toLowerCase()
        .trim()
        .replace(/ /g, "");
      points = category === "Miscellaneous" ? points : findPoints.points;

      semester = monthOptions[month].value;
      expiration = new Date(
        new Date().getTime() + parseInt(expiration, 10) * 60 * 60 * 1000
      );
      request = request === "true" || request === true ? true : false;

      isEventNameDuplicate = await Event.findOne({ name });

      if (isEventNameDuplicate) {
        throw new UserInputError("An event with that name already exists.", {
          errors: {
            name: "An event with that name already exists."
          }
        });
      }

      isEventCodeDuplicate = await Event.findOne({ code });

      if (isEventCodeDuplicate) {
        throw new UserInputError("An event with that code already exists.", {
          errors: {
            code: "An event with that code already exists."
          }
        });
      }

      const newEvent = new Event({
        name,
        code,
        category,
        points,
        attendance: 0,
        expiration,
        semester,
        request,
        users: [],
        createdAt: new Date().toISOString()
      });

      await newEvent.save();

      const updatedEvents = await Event.find();

      return updatedEvents;
    },

    async manualInput(
      _,
      {
        manualInputInput: { username, eventName }
      }
    ) {
      const { valid, errors } = validateManualInputInput(username);

      if (!valid) {
        throw new UserInputError("Errors", {
          errors
        });
      }

      const user = await User.findOne({
        username
      });

      const event = await Event.findOne({
        name: eventName
      });

      const request = await Request.findOne({
        username: username,
        eventName: eventName
      });

      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("User not found.", {
          errors
        });
      }

      if (!event) {
        errors.general = "Event not found.";
        throw new UserInputError("Event not found.", {
          errors
        });
      }

      if (request) {
        errors.general =
          "This member has sent a request for this event code. Check the Requests tab.";
        throw new UserInputError(
          "This member has sent a request for this event code. Check the Requests tab.",
          {
            errors
          }
        );
      }

      user.events.map(userEvent => {
        if (String(userEvent.name) == String(event.name)) {
          errors.general = "Event code already redeemed by the user.";
          throw new UserInputError("Event code already redeemed by the user.", {
            errors
          });
        }
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

      updatedUser.message = "";

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

      const updatedEvents = await Event.find();

      return updatedEvents;
    }
  }
};
