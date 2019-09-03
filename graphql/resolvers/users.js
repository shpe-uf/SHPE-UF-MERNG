const { UserInputError } = require("apollo-server");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User.js");

const {
  validateRegisterInput,
  validateLoginInput
} = require("../../util/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
}

require("dotenv").config();

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },

    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      isUsernameDuplicate = await User.findOne({ username });

      if (isUsernameDuplicate) {
        throw new UserInputError("An account with that username already exists", {
          errors: {
            username: "An account with that username already exists"
          }
        });
      }

      isEmailDuplicate = await User.findOne({ email });

      if (isEmailDuplicate) {
        throw new UserInputError("An account with that e-mail already exists", {
          errors: {
            email: "An account with that email already exists"
          }
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};
