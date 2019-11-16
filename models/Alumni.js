const { model, Schema } = require("mongoose");

const alumniSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  ugrad: {
    type: String,
    required: true
  },
  employer: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = model("Alumni", alumniSchema);
