const fs = require("fs");

class RouteHelper {
  async loadValidator(req, res, next, method) {
    const model = req.params.model;
    const pathValidator = "./src/validators/" + model + ".js";
    if (fs.existsSync(pathValidator)) {
      const validator = require("../validators/" + model);
      return validator[method](req, res, next);
    } else {
      next();
    }
  }
}

module.exports = RouteHelper;
