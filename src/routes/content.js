var express = require("express");
var router = express.Router();
const ContentController = require("../controllers/content");
const RouteHelper = require("../helpers/route");
const Controller = new ContentController();
const RouteHelpers = new RouteHelper();

router.get("/:model", async (req, res, next) => {
  next();
},async (req, res) => {
  return Controller.list(req, res);
});

router.post("/:model", async (req, res, next) => {
  return RouteHelpers.loadValidator(req, res, next, 'save');
},async (req, res) => {
  return Controller.save(req, res);
});

module.exports = router;
