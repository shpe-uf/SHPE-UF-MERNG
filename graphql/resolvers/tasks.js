const { UserInputError } = require("apollo-server");
const User = require("../../models/User.js");

const { validateManuelInputInput } = require("../../util/validators");

const monthOptions = require("../../client/src/assets/options/month.json");

module.exports = {
  Query: {
    async getTasks() {
      try {
        const tasks = await Task.find().sort({ createdAt: 1 });
        return tasks;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async createTask (
      _,
      {
        createTaskInput: { name, startDate, endDate, description, points }
      }
    )
  }
}
