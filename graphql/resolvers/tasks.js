const { UserInputError } = require("apollo-server");
const Task = require("../../models/Task");

const { validateCreateTaskInput } = require("../../util/validators");

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
    async createTask(
      _,
      {
        createTaskInput: { name, startDate, endDate, description, points }
      }
    ) {
      const { valid, errors } = validateCreateTaskInput(name, startDate, endDate, description, points);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // REVISIT THIS LATER TO DETERMINE SEMESTER EITHER WHEN TASK BEGINS OR ENDS.
      const month = new Date().getMonth();

      semester = monthOptions[month].value;

      isTaskDuplicate = await Task.findOne({ name });

      if (isTaskDuplicate) {
        throw new UserInputError("A task with that name already exists.", {
          errors: {
            name: "A task with that name already exists."
          }
        });
      }

      const newTask = new Task({
        name,
        startDate,
        endDate,
        description,
        points,
        attendance: 0,
        semester,
        users: [],
        createdAt: new Date().toISOString()
      });

      await newTask.save();

      const res = Task.find();

      return res;
    }
  }
};
