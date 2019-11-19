module.exports.validateRegisterInput = (
  firstName,
  lastName,
  major,
  year,
  graduating,
  country,
  ethnicity,
  sex,
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  const nameValidator = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const usernameValidator = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i;
  const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,12})$/;
  const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

  if (firstName.trim() === "") {
    errors.firstName = "First name is required.";
  } else {
    if (!firstName.match(nameValidator)) {
      errors.firstName =
        "First Name must be at least 3 character, max 20. No special characters or numbers.";
    }
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last Name is required.";
  } else {
    if (!lastName.match(nameValidator)) {
      errors.lastName =
        "Last name must be at least 3 character, max 20. No special characters or numbers.";
    }
  }

  if (major.trim() === "") {
    errors.major = "Major is required.";
  }

  if (year.trim() === "") {
    errors.year = "Year is required.";
  }

  if (graduating.trim() === "") {
    errors.graduating = "Graduating is required.";
  }

  if (country.trim() === "") {
    errors.country = "Country of Origin  is required.";
  }

  if (ethnicity.trim() === "") {
    errors.ethnicity = "Ethnicity is required.";
  }

  if (sex.trim() === "") {
    errors.sex = "Sex is required.";
  }

  if (username.trim() === "") {
    errors.username = "Username is required.";
  } else {
    if (!username.match(usernameValidator)) {
      errors.username =
        "Username must be at least 6 characters, max 20. No special characters, except for periods (.) and underscores (_).";
    }
  }

  if (email.trim() === "") {
    errors.email = "Email is required.";
  } else {
    if (!email.match(emailRegex)) {
      errors.email = "Invalid email address.";
    }
  }

  if (password === "") {
    errors.password = "Password is required.";
  } else if (!password.match(passwordValidator)) {
    errors.password =
      "Passwords must be at least 8 characters. It must contain at least one lowercase character, one uppercase character, one number, and one special character.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password and Confirm Password must match.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username is required.";
  }

  if (password.trim() === "") {
    errors.password = "Password is required.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validatePasswordInput = (password, confirmPassword) => {
  const errors = {};
  const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

  if (password === "") {
    errors.password = "Password is required.";
  } else if (!password.match(passwordValidator)) {
    errors.password =
      "Passwords must be at least 8 characters. It must contain at least one lowercase character, one uppercase character, one number, and one special character.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password and Confirm Password must match.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
}

module.exports.validateEmailInput = (email) => {
  const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,12})$/;
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email is required.";
  } else {
    if (!email.match(emailRegex)) {
      errors.email = "Invalid email address.";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateCreateEventInput = (
  name,
  code,
  category,
  points,
  expiration
) => {
  const errors = {};

  const nameValidator = /^[a-zA-Z0-9- ]{6,50}$/i;
  const codeValidator = /^[a-zA-Z0-9]{6,50}$/i;
  const pointsValidator = /^[1-9][0-9]*$/i;

  if (name.trim() === "") {
    errors.name = "Name is required.";
  } else {
    if (!name.match(nameValidator)) {
      errors.name =
        "Event name must be at least 6 characters, max 50. No special characters, except for hyphens (-) and dashes (/).";
    }
  }

  if (code.trim() === "") {
    errors.code = "Code is required.";
  } else {
    if (!code.match(codeValidator)) {
      errors.code =
        "Event code must be at least 6 characters, max 50. No special characters.";
    }
  }

  if (category.trim() === "") {
    errors.category = "Category is required.";
  }

  if (expiration.trim() === "") {
    errors.expiration = "Expires in is required.";
  }

  if (category.trim() === "Miscellaneous") {
    if (!points.match(pointsValidator)) {
      errors.points = "Points must be a whole number greater than 0.";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateRedeemPointsInput = code => {
  const errors = {};

  if (code.trim() === "") {
    errors.code = "No code was provided.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateManualInputInput = username => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "No username was provided.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateCreateCorporationInput = (
  name,
  logo,
  slogan,
  majors,
  industries,
  overview,
  mission,
  goals,
  businessModel,
  newsLink,
  applyLink
) => {
  const errors = {};

  if (name.trim() === "") {
    errors.name = "No name was provided.";
  }

  if (logo.trim() === "") {
    errors.slogan = "No logo was provided.";
  }

  if (slogan.trim() === "") {
    errors.slogan = "No slogan was provided.";
  }

  if (majors.length === 0) {
    errors.majors = "No majors were provided.";
  }

  if (industries.length === 0) {
    errors.industries = "No industries were provided.";
  }

  if (overview.trim() === "") {
    errors.overview = "No overview was provided.";
  }

  if (mission.trim() === "") {
    errors.mission = "No mission was provided.";
  }

  if (goals.trim() === "") {
    errors.goals = "No goals were provided.";
  }

  if (businessModel.trim() === "") {
    errors.businessModel = "No business model was provided.";
  }

  if (newsLink.trim() === "") {
    errors.newsLink = "No news link was provided.";
  }

  if (applyLink.trim() === "") {
    errors.applyLink = "No apply link was provided.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};