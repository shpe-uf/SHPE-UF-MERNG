const { model, Schema } = require("mongoose");
const Event = require("./Event").schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  graduating: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  ethnicity: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    lowecase: true,
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
  },
  createdAt: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  fallPoints: {
    type: Number,
    default: 0
  },
  springPoints: {
    type: Number,
    default: 0
  },
  summerPoints: {
    type: Number,
    default: 0
  },
  permission: String,
  listServ: Boolean,
  events: [{
    id: String,
    name: String,
    category: String,
    createdAt: String,
    points: Number
  }]
});

module.exports = model("User", userSchema);
