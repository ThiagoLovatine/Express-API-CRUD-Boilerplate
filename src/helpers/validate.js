const Validator = require("validatorjs");

const validator = (body, rules, customMessages) => {
  const validation = new Validator(body, rules, customMessages);
  return validation;
};

module.exports = validator;
