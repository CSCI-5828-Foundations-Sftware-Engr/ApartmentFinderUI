const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewAndRatingModelSchema = new Schema({
  propertyId: {
    type: String,
  },
  noOfReviews: {
    type: Number,
  },
  positive: {
    type: Number,
  },
  neutral: {
    type: Number,
  },
  negative: {
    type: Number,
  },
});

module.exports = mongoose.model("reviewAnalysis", ReviewAndRatingModelSchema, "reviewAnalysis");