const { UserInputError } = require("apollo-server");
const Event = require("../../models/Event.js");

const { validateCreateEventInput } = require("../../util/validators");

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
        createEventInput: { name, code, category, expiration }
      }
    ) {
      const { valid, errors } = validateCreateEventInput(
        name,
        code,
        category,
        expiration
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const findPoints = categoryOptions.find(({ key }) => key === category);
      const month = new Date().getMonth();

      points = findPoints.points;
      semester = monthOptions[month].value;
      expiration = new Date(new Date().getTime() + (parseInt(expiration, 10)*60*60*1000));
      code = code.toLowerCase();

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

      const newEvent = new Event({
        name,
        code,
        category,
        points,
        attendance: 0,
        expiration,
        semester,
        users: [],
        createdAt: new Date().toISOString()
      });

      const res = await newEvent.save();

      return {
        ...res._doc,
        id: res._id
      };
    }
  }
};
