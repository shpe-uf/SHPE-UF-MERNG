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
    async createTask(
      _,
      {
        createTaskInput: { name, startDate, endDate, description, points }
      }
    ) {
      const { valid, errors } = validateCreateTaskInput(name, points);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

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
        attendance,
        semester,
        users: [],
        createdAt: new Date().toISOString()
      });

      const res = await newTask.save();

      return {    //?
        ...res.doc,
        id: res._id
      };
    },

    async manualInput (
      _,
      {
        manualInputInput: { username, eventName }
      }
    ) {
      const { valid, errors } = validateManualInputInput(username);

      if (!valid) {
        trhow new UserInputError("Errors", {
          errors
        });
      }

      const user = await User.findOne({
        username
      });

      const task = await Task.findOne({
        name: taskName
      });

      const request = await Request.findOne({
        username: username,
        taskName: taskName
      });

      if (!user) {
        erors.general = "User not found.";
        throw new UserInputError("User not found.", {
          errors
        });
      }

      if(request) {
        errors.general =
          "This member has sent a request for this task. Check the Requests tab.";
        throw new UserInputError(
          "This member has sent a request for this task. Check the Requests tab.",
          {
            errors
          }
        );
      }

      user.events.map(userEvent => {
        if (String(userEvent.name) == String(event.name)) {
          errors.general = "Task already redeemed by the user.";
          throw new UserInputError("Event code already redeemed by the user.", {
            errors
          });
        }
      });

      var pointsIncrease = {};

      if(task.semester === "Fall Semester") {
        pointsIncrease = {
          points: task.points,
          fallPoints: task.points
        };
      } else if (task.semester === "Spring Semester") {
        pointsIncrease = {
          points: task.points,
          springPoints: task.points
        };
      } else if (task.semester === "Summer Semester") {
        pointsIncrease = {
          points: task.points,
          summerPOints: task.points
        };
      } else {
        errors.general = "Invalid task.";
        throw new UserInputError("Invalid event.", {
          errors
        });
      }
    }

    var updatedUser = await User.findOneAndUpdate(
      {
        username
      },
      {
        $push: {
          tasks: {
            $each: [
              {
                name: task.name
                createdAt: task.createdAt,
                points: task.points
              }
            ],
          }
        }
      }
    )
  }
};
