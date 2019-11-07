const { UserInputError } = require("apollo-server");
const User = require("../../models/User.js");
const Class = require("../../models/Class.js");

const {
  validateCreateClassInput
} = require("../../util/validators");

const findMatch = (matches, username) => {
  matches.map((match) => {
    if (match.username === username) {
      match.score += 5;
      return true;
    }})
  return false;
}

module.exports = {
    Query: {
        async getClasses(_, { username }) {
          try {
            const user = await User.findOne({ username });
            var foundClasses = [];
            foundClasses = user.classes;
            return foundClasses;
          } catch (err) {
            throw new Error(err);
          }
        },
        async getMatches(_, { username }) {
          const matches = [];
          const user = await User.findOne({ username });
          user.classes.map(async (classTemp) => {
            const newClassTemp = await Class.findOne({ code: classTemp });
            newClassTemp.users.map(userTemp => {
              if(!findMatch(matches, userTemp.username) && user.username !== userTemp.username){
                const newTemp = {firstName:userTemp.firstName, lastName: userTemp.lastName, email: userTemp.email, username: userTemp.username, score:5};
                matches.push(newTemp);
              }
            })
          });
          await User.findOne({ username });
          console.log(matches)
          return matches;
        }
    },

    Mutation: {
        async createClass(_, { createClassInput: { code, username }}) {
          const { valid, errors } = validateCreateClassInput(
            code);

            if (!valid) {
              throw new UserInputError("Errors", { errors });
            }  
        
            code = code.toUpperCase();

            const user = await User.findOne({ username });

            if(!user) {
              throw new UserInputError("User not found.", {
                errors: {
                  username: "User not found."
                }
              });
            }

            const classFound = await Class.findOne({ code });
            
            if(classFound) {
              classFound.users.map(classUser => {
                if (String(classUser.username) == String(user.username)){
                  errors.general = "Class has already been added to your profile.";
                  throw new UserInputError("Class has already been added to your profile.", {
                  errors
                });
                }
              })
              await Class.findOneAndUpdate({ code },
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
                  }
                },
                {
                  new: true
                }
              );
            } else {
              const newClass = new Class({
                code,
                users: [{
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  email: user.email
                }]
              });
              await newClass.save();
            }

            await User.findOneAndUpdate({ username }, 
              {
                $push: {
                  classes: {  
                    $each: [code],
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
        }
    }
}