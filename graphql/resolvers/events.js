const { UserInputError } = require("apollo-server");
const Event = require("../../models/Event.js");

const { validateCreateEventInput } = require("../../util/validators");

const categoryOptions = require("../../client/src/assets/options/category.json");
const monthOptions = require("../../client/src/assets/options/month.json");

module.exports = {
  Query: {
    async getEvents() {
      try {
        const events = await Event.find().sort({ name: -1 });
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
        createEventInput: { name, code, category }
      }
    ) {
      const { valid, errors } = validateCreateEventInput(name, code, category);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      isEventNameDuplicate = await Event.findOne({ name });

      if (isEventNameDuplicate) {
        throw new UserInputError("An event with that name already exists", {
          errors: {
            name: "An event with that name already exists"
          }
        });
      }

      isEventCodeDuplicate = await Event.findOne({ code });

      if (isEventCodeDuplicate) {
        throw new UserInputError("An event with that code already exists", {
          errors: {
            code: "An event with that code already exists"
          }
        });
      }

      const findPoints = categoryOptions.find(({ key }) => key === category);
      points = findPoints.points;
      const month = new Date().getMonth();
      semester = (monthOptions[month].value);

      const newEvent = new Event({
        name,
        code,
        category,
        points,
        attendance: 0,
        expiration: new Date().toISOString(),
        semester,
        attendees: []
      });

      const res = await newEvent.save();

      return {
        ...res._doc,
        id: res._id
      };
    }
  }
};
