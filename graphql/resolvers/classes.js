const { UserInputError } = require("apollo-server");
const User = require("../../models/User.js");
const lodash = require('lodash');
const Class = require("../../models/Class.js");

const { validateCreateClassInput } = require("../../util/validators");

module.exports = {
  Query: {
    async getMatches(_, { username }) {
      var matches = [];
      console.time('calls');
      const user = await User.findOne({ username });

      user.classes.map(async classTemp => {
        const newClassTemp = await Class.findOne({ code: classTemp.code }).select("-users._id");
        lodash.remove(newClassTemp.users, function (user){
          return user.username === username;
        });
        await matches.push(newClassTemp.users);
      });
      
      await User.find();
      matches = await lodash.flatten(matches);
      matches = await lodash.uniqBy(matches, "username");
      matches = await lodash.map(matches, lodash.partialRight(lodash.pick, 'username'));
      matches = await matches.map(function(match){
        return match["username"]
      })

      const users = await User.find({
        username : {$in: matches}
      }).sort({lastName: 1, firstName: 1});
      
      console.log(users)

      return users;
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
      console.log('booys');
      const user = await User.findOne({ username });
      const classFound = await Class.findOne({ code });
      console.log('here');
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