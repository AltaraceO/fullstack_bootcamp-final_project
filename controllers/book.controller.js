const Books = require("../models/book");

//create a new user
const addBook = async (req, res) => {
  const book = new Books(req.body);
  try {
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
        g.genre !== "Large type books"
    );

    res.send(genres);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  addBook,
  getBooks,
  getGenres,
};
