const res = require("express/lib/response");
const Books = require("../models/book");

//create a new user
const addBook = async (req, res) => {
  const book = new Books(req.body);
  try {
    const bookLocal = await Books.findOne({ isbn_13: req.body.isbn_13 });

    if (bookLocal) {
      return res.status(201).send(bookLocal);
    }
    await book.save();

    res.status(201).send(book);
  } catch (err) {
    res.status(404).send(err);
  }
};

const getBooks = async (req, res) => {
  try {
    const arr = req.user.books;
    const records = await Books.find({ _id: { $in: arr } });
    res.status(201).send(records);
  } catch (err) {
    res.status(404).send(err);
  }
};

const getGenres = async (req, res) => {
  const irrelevant = [
    "Accessible book",
    "Protected DAISY",
    "English Detective and mystery stories",
    "New York Times bestseller",
    "Large type books ",
  ];
  try {
    const genres = req.user.genres.filter(
      (g) =>
        g.value > 2 &&
        g.genre !== "Accessible book" &&
        g.genre !== "Protected DAISY" &&
        g.genre !== "English Detective and mystery stories" &&
        g.genre !== "New York Times bestseller" &&
        g.genre !== "Large type books" &&
        g.genre !== `Reading Level-Grade ${10 && 9}`
    );

    res.send(genres);
  } catch (err) {
    res.status(404).send(err);
  }
};

const addComment = async (req, res) => {
  try {
    const comment = req.body.comment;
    const commentObj = {
      author: req.body.author,
      comment,
    };

    const book = await Books.findById(req.body.book._id);

    book.comments.push(commentObj);

    const updatedBook = await Books.findByIdAndUpdate(req.body.book._id, book, {
      new: true,
    });

    res.send(updatedBook);
  } catch (error) {}
};

const checkBooks = async (req, res) => {
  try {
    const bookLocal = await Books.findOne({ isbn_13: req.body.isbn_13 });

    if (bookLocal) {
      return res.status(201).send(bookLocal);
    }

    res.send(req.body);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  addBook,
  getBooks,
  getGenres,
  addComment,
  checkBooks,
};
