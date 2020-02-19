const { model, Schema } = require("mongoose");
const Event = require("./Event").schema;
const Task = require("./Task").schema;
const Class = require("./Class").schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: ""
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
  permission: {
    type: String,
    default: "member"
  },
  listServ: Boolean,

  events: [{
    name: String,
    category: String,
    createdAt: String,
    points: Number,
  }],

  tasks: [{
    name: String,
    createdAt: String,
    points: Number,
  }],

  classes: [
    {
      code: String
    }
  ],
  token: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  bookmarks: [String]
});

module.exports = model("User", userSchema);
