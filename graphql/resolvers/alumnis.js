const { UserInputError } = require("apollo-server");
const nodegeocoder = require("node-geocoder");

const Alumni = require("../../models/Alumni.js");

require("dotenv").config();

const { validateRegisterAlumniInput } = require("../../util/validators");

module.exports = {
  Query: {
    async getAlumnis() {
      try {
        const alumni = await Alumni.find().sort({ lastName: 1, firstName: 1 });
        return alumni;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async registerAlumni(
      _,
      {
        registerAlumniInput: {
          firstName,
          lastName,
          email,
          undergrad,
          grad,
          employer,
          position,
          location,
          linkedin
        }
      }
    ) {
      const { valid, errors } = validateRegisterAlumniInput(
        firstName,
        lastName,
        email,
        undergrad,
        grad,
        employer,
        position,
        location,
        linkedin
      );

      var coordinates = {
        latitude: 0,
        longitude: 0
      };

      if (!valid) {
        throw new UserInputError("Errors", {
          errors
        });
      }

      const isEmailDuplicate = await Alumni.findOne({ email });

      if (isEmailDuplicate) {
        throw new UserInputError("that e-mail already exists.", {
          errors: {
            email: "that email already exists."
          }
        });
      }

      const alumniLocation =
        location.city +
        ", " +
        (location.state ? location.state + ", " : "") +
        location.country;

      var ngcOptions = {
        provider: "mapquest",
        httpAdapter: "https",
        apiKey: process.env.MQ_KEY,
        formatter: null
      };

      var geocoder = nodegeocoder(ngcOptions);

      await geocoder
        .geocode(alumniLocation)
        .then(function(res) {
          coordinates.latitude = res[0].latitude;
          coordinates.longitude = res[0].longitude;
        })
        .catch(function(err) {
          throw new UserInputError(
            "Invalid location, please check city, state and/or country.",
            {
              errors: {
                general:
                  "Invalid location, please check city, state and/or country."
              }
            }
          );
        });

        const newAlumni = new Alumni({
          firstName,
          lastName,
          email,
          undergrad,
          grad,
          employer,
          position,
          location,
          coordinates,
          linkedin
        });

        await newAlumni.save();

        return newAlumni;
    }
  }
};
