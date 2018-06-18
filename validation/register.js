const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = data => {
  //  Init erros empty object and set current state of Validation
  let errors = {};
  let isValid = true;

  //  Validator only recognizes empty string not null od undefinde
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //  Validate with validator
  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.name = "Name must be between 4 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Password doesn't match";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  //    If there are erros set validator to false
  if (Object.keys(errors).length > 0) {
    isValid = false;
  }

  return {
    errors,
    isValid
  };
};

module.exports = validateRegisterInput;
