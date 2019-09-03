const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  code: String,
  category: String,
  points: String,
  attendance: Number,
  expiration: String,
  semester: String,
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ]
});

module.exports = model("Event", eventSchema);
