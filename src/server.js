// Bring in our dependencies
const app = require("express")();
const routes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
