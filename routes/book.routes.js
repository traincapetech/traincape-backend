const express = require("express");
const { bookModel } = require("../model/book.model");

const bookRouter = express.Router();

bookRouter.get("/get-book", async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 20;
    let skip = (page - 1) * limit;

    const book = await bookModel.find().skip(skip).limit(limit);

    const totalbook = await bookModel.countDocuments();
    const totalPages = Math.ceil(totalbook / limit);

    res.send({
      book,
      currentPage: page,
      totalPages,
      totalbook,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

bookRouter.post("/create-book", async (req, res) => {
  const payload = req.body;

  try {
    const book = new bookModel(payload);
    await book.save();
    res.status(200).send({ msg: "A new Book is created", "new book": book });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { bookRouter };
