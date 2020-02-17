const { model, Schema } = require("mongoose");
const User = require("./User").schema;

const classSchema = new Schema({
    code: {
      type: String,
      required: true,
      unique: true
    },
    users: [{
      firstName: String,
      lastName: String,
      email: String,
      username: String, 
      major: String,
      year: String
    }]
})

module.exports = model("Class", classSchema);