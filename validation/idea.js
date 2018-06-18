const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateIdeaInput = data => {
  //  Init erros empty object and set current state of Validation
  let errors = {};
  let isValid = true;

  //  Validator only recognizes empty string not null od undefinde
  data.title = !isEmpty(data.title) ? data.title : "";
  data.descripton = !isEmpty(data.descripton) ? data.descripton : "";

  //  Validate with validator

  if (!Validator.isLength(data.title, { min: 4, max: 30 })) {
    errors.title = "Name must be between 4 and 30 characters";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (!Validator.isLength(data.description, { min: 15, max: 300 })) {
    errors.description = "description must be between 15 and 300 characters";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "description field is required";
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

module.exports = validateIdeaInput;
