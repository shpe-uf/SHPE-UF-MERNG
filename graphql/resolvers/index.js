const usersResolvers = require("./users.js");
const eventsResolvers = require("./events.js");
const requestsResolvers = require("./requests.js");
<<<<<<< HEAD
const tasksResolvers = require("./tasks.js");
=======
const corporationResolvers = require("./corporations.js");
const classResolvers = require("./classes.js");
const alumnisResolvers = require("./alumnis.js");
>>>>>>> master

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...eventsResolvers.Query,
    ...requestsResolvers.Query,
<<<<<<< HEAD
    ...tasksResolvers.Query
=======
    ...corporationResolvers.Query,
    ...alumnisResolvers.Query,
    ...classResolvers.Query
>>>>>>> master
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...eventsResolvers.Mutation,
    ...requestsResolvers.Mutation,
<<<<<<< HEAD
    ...tasksResolvers.Mutation
=======
    ...corporationResolvers.Mutation,
    ...alumnisResolvers.Mutation,
    ...classResolvers.Mutation
>>>>>>> master
  }
};
