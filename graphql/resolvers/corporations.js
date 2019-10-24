const { UserInputError } = require("apollo-server");
const Corporation = require("../../models/Corporation.js");
const Request = require("../../models/Request.js");

require("dotenv").config();

const {
  validateCreateCorporationInput
} = require("../../util/validators");

module.exports = {
  Query: {
    async getCorporations() {
      try {
        const corporations = await Corporation.find().sort({ createdAt: 1 });
        return corporations;
      } catch (err) {
        throw new Error(err);
      }
    }, 

    async getCorporation(_, { corporateId }) {
      try {
        const corporation = await Corporation.findById(corporateId);
        
        if(corporation) {
          return corporation;
        } else {
          throw new Error("Corporation not found.")
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createCorporation(
      _,
      {
        createCorporationInput: { 
          name, 
          slogan, 
          majors, 
          industries, 
          overview, 
          mission, 
          goals, 
          businessModel, 
          newsLink,       
          applyLink, 
          academia, 
          govContractor, 
          nonProfit, 
          visaSponsor, 
          shpeSponsor, 
          industryPartnership,
          fallBBQ, 
          springBBQ, 
          nationalConvention 
        }
      }
    ) {
      console.log('RUNNING')
      const { valid, errors } = validateCreateCorporationInput(
        name,
        slogan,
        majors,
        industries,
        overview,
        mission,
        goals,
        businessModel,
        newsLink,
        applyLink
      );
      console.log(valid)
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      isCorporationNameDuplicate = await Corporation.findOne({ name });

      if (isCorporationNameDuplicate) {
        throw new UserInputError("This corporation is already in our database.", {
          errors: {
            name: "This corporation is already in our database."
          }
        });
      }

      const newCorporation = new Corporation({
        name,
        slogan,
        majors,
        industries,
        overview,
        mission,
        goals,
        businessModel,
        newsLink,
        applyLink,
        academia, 
        govContractor, 
        nonProfit, 
        visaSponsor, 
        shpeSponsor, 
        industryPartnership,
        fallBBQ, 
        springBBQ, 
        nationalConvention,
        createdAt: new Date().toISOString()
      });

      const res = await newCorporation.save();

      return {
        createdAt
      };
    }
  }
};
