const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  pdflink: {
    type: String,
    required: true,
  },
  Doclink: {
    type: String,
    required: true,
  },
});

const bookModel = mongoose.model("Book", bookSchema);

module.exports = {
  bookModel,
};
