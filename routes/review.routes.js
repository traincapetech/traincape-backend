const express = require("express");
const { reviewModel } = require("../model/review.model");
const reviewRouter = express.Router();

reviewRouter.get("/all", async (req, res) => {
  try {
    const review = await reviewModel.find();
    res.send(review);
  } catch (error) {
    res.send(error);
  }
});
reviewRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    // Check if payload is an array
    if (Array.isArray(payload)) {
      // Create an array of review documents
      const reviews = payload.map((doc) => new reviewModel(doc));
      // Save the reviews
      await reviewModel.insertMany(reviews);
      res.status(201).send({ msg: "Multiple reviews created" });
    } else {
      // Create a single review document
      const review = new reviewModel(payload);
      await review.save();
      res.status(201).send({ msg: "A new review is created" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

reviewRouter.get("/get-review", async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    const review = await reviewModel.find().skip(skip).limit(limit);

    const totalreview = await reviewModel.countDocuments();
    const totalPages = Math.ceil(totalreview / limit);

    res.send({
      review,
      currentPage: page,
      totalPages,
      totalreview,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = { reviewRouter };
