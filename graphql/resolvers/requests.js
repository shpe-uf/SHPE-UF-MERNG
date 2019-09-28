const { UserInputError } = require("apollo-server");
const Request = require("../../models/Request.js");

const { validateCreateEventInput } = require("../../util/validators");

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
  }
};
