const { UserInputError } = require("apollo-server");
const Request = require("../../models/Request.js");
const Event = require("../../models/Event.js");
const Task = require("../../models/Task.js");
const User = require("../../models/User.js");

function generateToken(user, time) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET,
    {
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
      _,
      {
        approveRejectRequestInput: { username, name, type }
      }
    ) {
      const res = await Request.deleteOne({
        username: username,
        name: name,
        type: type
      });

      const requests = await Request.find().sort({
        createdAt: 1
      });

      return requests;
    },

    async approveRequest(
      _,
      {
        approveRejectRequestInput: { username, name, type }
      }
    ) {
      console.log("test");
      const event = await Event.findOne({
        name: name
      });
      const task = await Task.findOne({
        name: name
      });
      const user = await User.findOne({
        username
      });

      if(!task){
        console.log(task);
      }

      var pointsIncrease = {};

      if (type != "Task") {
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
                $sort: {
                  createdAt: 1
                }
              }
            },
            $inc: pointsIncrease
          },
          {
            new: true
          }
        );
      }
      else {
        if (task.semester === "Fall Semester") {
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
            summerPoints: task.points
          };
        } else {
          errors.general = "Invalid Task.";
          throw new UserInputError("Invalid Task.", {
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
                    name: task.name,
                    startDate: task.startDate,
                    endDate: task.endDate,
                    points: task.points
                  }
                ],
                $sort: {
                  createdAt: 1
                }
              }
            },
            $inc: pointsIncrease
          },
          {
            new: true
          }
        );
      }


      await Event.findOneAndUpdate(
        {
          name: name
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
              $sort: {
                lastName: 1,
                firstName: 1
              }
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

      await Task.findOneAndUpdate(
        {
          name: name
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
              $sort: {
                lastName: 1,
                firstName: 1
              }
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
        name: name
      });

      const requests = await Request.find().sort({
        createdAt: 1
      });

      return requests;
    }
  }
};
