// Bring in our dependencies
const app = require("express")();
const routes = require("./routes");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

routes(app);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
