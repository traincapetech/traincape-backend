import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name: String,
  review: String,
  reviewtime: String,
  star: Number,
  image: String,
});

const reviewModel = mongoose.model("reviews", reviewSchema);

export { reviewModel };
