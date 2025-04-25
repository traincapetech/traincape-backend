import express from "express";
import { BookModel } from "../model/book.model.js";
import { getAllBooks } from "../controllers/book.controller.js";
const bookRouter = express.Router();

bookRouter.get("/get-books", getAllBooks);

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