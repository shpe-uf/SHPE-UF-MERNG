const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  major: String,
  year: String,
  graduating: String,
  country: String,
  ethnicity: String,
  sex: String,
  username: String,
  email: String,
  password: String,
  createdAt: String,
  points: Number,
  fallPoints: Number,
  springPoints: Number,
  summerPoints: Number,
  permission: String,
  listServ: Boolean,
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "events"
    }
  ],
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: "companies"
    }
  ]
});

module.exports = model("User", userSchema);
