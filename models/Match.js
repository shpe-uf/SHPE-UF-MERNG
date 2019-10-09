const { model, Schema } = require("mongoose");
const User = require("./User").schema;
const Class = require("./Class").schema;

const matchSchema = new Schema({
    user: {
      type: User,
      required: true
    },
    sharedClasses: [{
      type: Class,
      required: true
    }],
    score: [{
        type: Int,
        required: true
    }]
})

module.exports = model("Match", matchSchema);