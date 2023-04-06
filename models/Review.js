const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewModelSchema = new Schema({
  propertyId: {
    type: String,
  },
  userName: {
    type: String,
  },
  review: {
    type: String,
  },
});

module.exports = mongoose.model("review", ReviewModelSchema, "reviews");