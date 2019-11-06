const { model, Schema } = require("mongoose");
const User = require("./User").schema;
const Event = require("./Event").schema;

const requestSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    lowecase: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = model("Request", requestSchema);
