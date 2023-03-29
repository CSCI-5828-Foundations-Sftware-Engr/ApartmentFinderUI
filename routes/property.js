const mongoose = require("mongoose");
const user = mongoose.model("propertyData");

module.exports = (app) => {
  app.post("/property/:id", (req, res) => {
    const { propertyId } = req.params.id;
    console.log(propertyId);
  });
};