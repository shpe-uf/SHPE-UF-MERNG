const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs.js")

require("dotenv").config();

const resolvers = require("./graphql/resolvers");
const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub })
});

mongoose
  .connect(process.env.URI, { useNewUrlParser: true })
  .then(() => {
    console.log("\nSUCCESS: CONNECTED TO DATABASE");
    return server.listen({ port: (process.env.PORT || 5000) });
  })
  .then(res => {
    console.log(`\nSERVER RUNNING AT ${res.url}`);
  });
