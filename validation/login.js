const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateLoginInput = data => {
  //  Init erros empty object and set current state of Validation
  let errors = {};
  let isValid = true;

  //  Validator only recognizes empty string not null od undefinde
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //  Validate with validator

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
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

module.exports = validateLoginInput;
