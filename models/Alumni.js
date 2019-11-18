const { model, Schema } = require("mongoose");

const alumniSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  undergrad: {
    university: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    major: {
      type: String,
      required: true
    }
  },
  grad: {
    university: {
      type: String
    },
    year: {
      type: Number,
      default: 0
    },
    major: {
      type: String
    }
  },
  employer: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String
    },
    country: {
      type: String,
      required: true
    }
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  linkedin: {
    type: String,
    required: true
  }
});

module.exports = model("Alumni", alumniSchema);
