const usersResolvers = require("./users.js");
const eventsResolvers = require("./events.js");
const requestsResolvers = require("./requests.js");
const corporationResolvers = require("./corporations.js");
const classResolvers = require("./classes.js");
const alumnisResolvers = require("./alumnis.js");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...eventsResolvers.Query,
    ...requestsResolvers.Query,
    ...corporationResolvers.Query,
    ...alumnisResolvers.Query,
    ...classResolvers.Query
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...eventsResolvers.Mutation,
    ...requestsResolvers.Mutation,
    ...corporationResolvers.Mutation,
    ...alumnisResolvers.Mutation,
    ...classResolvers.Mutation
  }
};
