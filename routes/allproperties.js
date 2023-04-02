const mongoose = require("mongoose");
const propertyData = mongoose.model("propertyData");

module.exports = (app) => {
  app.get("/allproperties", (req, res) => {
    propertyData
      .find()
      .then((result) => {
        // console.log(result);
        res.status(200).send({ properties: result });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  });
};
