const { model, Schema } = require("mongoose");
const User = require("./User").schema;

const classSchema = new Schema({
    courseNum: {
      type: String,
      required: true
    },
    sectionNum: {
      type: String,
      required: true
    },
    users: [{
        type: User,
        required: true
    }]
})

module.exports = model("Class", classSchema);