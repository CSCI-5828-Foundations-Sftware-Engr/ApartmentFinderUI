const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(cors());

//import your models
require("./models/User");
require("./models/Property");

mongoose
  //   .connect(process.env.MONGODB_CONNECTION_STRING, {
  .connect(
    "mongodb+srv://shka5709:fseData123@fseproject.j4lmokk.mongodb.net/Property?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import routes
require("./routes/login.js")(app);
require("./routes/register.js")(app);
require("./routes/allproperties.js")(app);
require("./routes/property.js")(app);

const PORT = process.env.PORT || 6999;
// const PORT = 6999;

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
