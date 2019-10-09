const { UserInputError } = require("apollo-server");
const User = require("../../models/User.js");
const Class = require("../../models/Class.js");
const Match = require("../../models/Match.js");

function findUser(lookingFor, user) {
    user.matches.map(matchTemp => {
        if (String(matchTemp) === lookingFor) {
            return matchTemp
        }
        return null
    })
}

module.exports = {
    Query: {
        async getClasses() {
            try {
                const classes = await Class.find().sort({ classes: 1 });
                return classes;
              } catch (err) {
                throw new Error(err);
              }
        },

        async getMatches() {
            try {
                const matches = await Match.find().sort({ score: 1 });
                return matches;
              } catch (err) {
                throw new Error(err);
              }
        }
    },

    Mutation: {
        async addClass(_, { classInput: { courseNum, sectionNum, username }}) {
            const user = await User.findOne({ username });

            if (!user) {
                errors.general = "User not found.";
                throw new UserInputError("User not found.", {
                  errors
                });
              };
            
            const foundClass = await Class.find({ courseNum });

            if (foundClass) { 
              foundClass.map(classTemp => {
                classTemp.users.map(userT => {
                  const match = findUser(userT, user);
                  if (match){
                      match.score += 5;
                      match.sharedClasses.push(classTemp);
                      const otherMatch = finduser(user, userT);
                      if (otherMatch){
                        otherMatch.score += 5;
                        otherMatch.sharedClasses.push(classTemp)
                      }
                      else {
                          userT.matches.push(new Match(user, [classTemp], 5));
                      }
                  }
                  else {
                    userT.matches.push(new Match(user, [classTemp], 5));
                    user.matches.push(new Match(userT, [classTemp], 5));
                  }
                  }
                );
                classTemp.users.push(user);
              })
              const exactClass = await Class.findOne({ courseNum, sectionNum });
              user.schedule.push(exactClass);
            }

        }
    }
}