const content = require("./content");

const routes = (app) => {
  app.use("/content", content);
};

module.exports = routes;
