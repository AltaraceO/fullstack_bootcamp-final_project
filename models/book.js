const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authors: [],
  categories: [],
  isbn_10: [],
  isbn_13: [],
  publisher: [],
  subtitle: String,
  pages: Number,
  thumb: {
    type: String,
    required: true,
  },
  url: String,
});
const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
