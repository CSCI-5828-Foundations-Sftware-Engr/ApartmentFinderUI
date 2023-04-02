const mongoose = require("mongoose");
const property = mongoose.model("propertyData");

module.exports = (app) => {
  app.post("/property", (req, res) => {
    //const { propertyId } = req.params.id;
    const { propertyId } = req.body;
    property
      .findOne({ propertyId: propertyId })
      .then((propertyResult) => {
        console.log("Found property");
        console.log(propertyResult);
        if (propertyResult) {
          res.status(200).send({ property: propertyResult });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  });
};
