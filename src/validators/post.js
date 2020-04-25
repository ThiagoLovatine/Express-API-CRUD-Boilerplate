const ValidatorHelper = require("../helpers/validate");

const save = (req, res, next) => {
  const rules = {
    email: "required|email",
    username: "required|string",
    phone: "required|string",
    password: "required|string|min:6|confirmed",
    gender: "string",
  };

  try {
    const validation = ValidatorHelper(req.body, rules, {});
    validation.passes(() => {
      next();
    });
    validation.fails(() => {
      res.status(412).json(validation.errors);
    });
  } catch (err) {
    res.status(412).json({ message: validation.errors });
    next();
  }
};

module.exports = {
  save,
};
