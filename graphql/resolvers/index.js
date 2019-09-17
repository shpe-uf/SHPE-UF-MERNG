const usersResolvers = require("./users.js");
const eventsResolvers = require("./events.js");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...eventsResolvers.Query
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...eventsResolvers.Mutation
  }
}
