const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInput(data) {
  let errors = {};

  data.item = !isEmpty(data.item) ? data.item : "";

  if (Validator.isEmpty(data.item)) {
    errors.item = "This field is required";
  }

  // Verify characters
  if (!Validator.isLength(data.item, { max: 10 })) {
    errors.item = "Please enter an item no more than 10 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
