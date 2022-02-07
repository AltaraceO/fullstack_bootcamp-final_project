const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authors: [],
  categories: [],
  isbn_10: {
    type: String,
    unique: true,
  },
  isbn_13: {
    type: Number,
    unique: true,
  },
  publisher: [],
  subtitle: String,
  pages: Number,
  thumb: {
    type: String,
    required: true,
  },
  url: String,
  comments: {
    type: [
      {
        author: String,
        comment: String,
      },
    ],
    default: [],
  },
  likes: {
    type: [String],
  },
  read: {
    type: [String],
  },
});

booksSchema.post("save", function (err, doc, next) {
  if (err.message.includes(11000)) {
    next("This book is already included");
  } else {
    next(err);
  }
});

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
