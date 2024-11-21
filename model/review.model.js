const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: String,
  review: String,
  reviewtime: String,
  star: Number,
  image: String,
});

const reviewModel = mongoose.model("reviews", reviewSchema);

module.exports = {
  reviewModel,
};
