const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  name: String,
  code: String,
  category: String,
  points: Number,
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
