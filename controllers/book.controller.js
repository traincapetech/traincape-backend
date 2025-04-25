import { BookModel } from "../model/book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};