var express = require("express");
var router = express.Router();
const PictureController = require("../controllers/picture");
const Controller = new PictureController();

router.post("/", async (req, res, next) => {
  return Controller.save(req, res);
});

module.exports = router;
