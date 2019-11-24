const { UserInputError } = require("apollo-server");
const User = require("../../models/User.js");
const Class = require("../../models/Class.js");

const { validateCreateClassInput } = require("../../util/validators");

const findMatch = (matches, username) => {
  for (var i = 0; i < matches.length; i++) {
    if (matches[i].username === username) {
      return i;
    }
  }
  return -1;
};

module.exports = {
  Query: {
    async getMatches(_, { username }) {
      const matches = [];
      const user = await User.findOne({ username });
      await user.classes.map(async classTemp => {
        const newClassTemp = await Class.findOne({ code: classTemp.code });
        newClassTemp.users.map(userTemp => {
          if (findMatch(matches, userTemp.username) === -1) {
            if (user.username !== userTemp.username) {
              const newTemp = {
                firstName: userTemp.firstName,
                lastName: userTemp.lastName,
                email: userTemp.email,
                username: userTemp.username,
                major: userTemp.major,
                year: userTemp.year,
                score: 5
              };
              matches.push(newTemp);
            }
          } else {
            matches[findMatch(matches, userTemp.username)].score += 5;
          }
        });
      });
      await User.find();
      return matches;
    }
  },

  Mutation: {
    async getClass(_, { code }) {
      try {
        const tclass = await Class.findOne({ code });
        return tclass;
      } catch (err) {
        throw new Error(err);
      }
    },
    async createClass(_, { createClassInput: { code, username } }) {
      const { valid, errors } = validateCreateClassInput(code);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      code = code.toUpperCase();

      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError("User not found.", {
          errors: {
            username: "User not found."
          }
        });
      }

      const classFound = await Class.findOne({ code });

      if (classFound) {
        classFound.users.map(classUser => {
          if (String(classUser.username) == String(user.username)) {
            errors.general = "Class has already been added to your profile.";
            throw new UserInputError(
              "Class has already been added to your profile.",
              {
                errors
              }
            );
          }
        });
        await Class.findOneAndUpdate(
          { code },
          {
            $push: {
              users: {
                $each: [
                  {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email, 
                    major: user.major,
                    year: user.year
                  }
                ],
                $sort: { lastName: 1, firstName: 1 }
              }
            }
          },
          {
            new: true
          }
        );
      } else {
        const newClass = new Class({
          code,
          users: [
            {
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              email: user.email, 
              major: user.major,
              year: user.year
            }
          ]
        });
        await newClass.save();
      }

      const classJustAdded = await Class.findOne({ code });

      await User.findOneAndUpdate(
        { username },
        {
          $push: {
            classes: {
              $each: [
                {
                  code
                }
              ],
              $sort: { code: 1 }
            }
          }
        },
        {
          new: true
        }
      );

      var res = await User.findOne({ username });

      return res.classes;
    },
    async deleteClass(_, { deleteClassInput: { code, username } }) {
      const user = await User.findOne({ username });
      const classFound = await Class.findOne({ code });

      if (classFound) {
        classFound.users = classFound.users.filter(
          userT => userT.username !== username
        );
        await classFound.save();
      }

      if (user) {
        user.classes = user.classes.filter(classT => classT.code !== code);
        await user.save();
      }

      const res = await User.findOne({ username });
      return res.classes;
    }
  }
};
