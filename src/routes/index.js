const content = require("./content");
const picture = require("./picture");

const routes = (app) => {
  app.use("/content", content);
  app.use("/picture", picture);
};

module.exports = routes;
