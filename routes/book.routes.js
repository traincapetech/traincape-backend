import express from "express";
import { BookModel } from "../model/book.model.js";

const bookRouter = express.Router();

bookRouter.get("/allBooks", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.send(books);
  } catch (error) {
    res.send(error);
  }
});

bookRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    // Check if payload is an array
    if (Array.isArray(payload)) {
      // Create an array of Book documents
      const books = payload.map((doc) => new BookModel(doc));
      // Save the Books
      await BookModel.insertMany(books);
      res.status(201).send({ msg: "Multiple Books created" });
    } else {
      // Create a single Book document
      const book = new BookModel(payload);
      await book.save();
      res.status(201).send({ msg: "A new Book is created" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

export { bookRouter };
