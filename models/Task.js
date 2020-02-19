const { model, Schema } = require("mongoose");
const User = require("./User").schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  attendance: {
    type: Number,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  users: [
    {
      firstName: String,
      lastName: String,
      email: String,
      username: String
    }
  ]
});

module.exports = model("Task", taskSchema);
