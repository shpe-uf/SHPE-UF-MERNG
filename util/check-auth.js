const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

require("dotenv").config();

module.exports = context => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/expired token");
      }
    }
    throw new Error("Authentication token must follow the format: 'Bearer [token]'");
  }

  throw new Error("Authorization header must be provided");
};
