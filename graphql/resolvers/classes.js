const { UserInputError } = require("apollo-server");
const User = require("../../models/User.js");
const Class = require("../../models/Class.js");

const {
  validateCreateClassInput
} = require("../../util/validators");

module.exports = {
    Query: {
        async getClasses() {
          try {
            const classes = await Class.find().sort({ code: 1 });
            return classes;
          } catch (err) {
            throw new Error(err);
          }
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

            const res = await Class.findOne({ code });

            return res;
        }
    }
}