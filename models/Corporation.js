const { model, Schema } = require("mongoose");

const corporationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slogan: {
    type: String,
    required: true
  },
  majors: [{
    type: String,
    required: true
  }],
  industries: [{
    type: String,
    required: true
  }],
  overview: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  goals: {
    type: String,
    required: true
  },
  businessModel: {
    type: String,
    required: true
  },
  newsLink: {
    type: String,
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },
  academia: {
    type: String,
    required: true
  },
  govContractor: {
    type: String,
    required: true
  },
  nonProfit: {
    type: String,
    required: true
  },
  visaSponsor: {
    type: String,
    required: true
  },
  shpeSponsor: {
    type: String,
    required: true
  },
  industryPartnership: {
    type: String,
    required: true
  },
  fallBBQ: {
    type: String,
    required: true
  },
  springBBQ: {
    type: String,
    required: true
  },
  nationalConvention: {
    type: String,
    required: true
  }
});

module.exports = model("Corporation", corporationSchema);
