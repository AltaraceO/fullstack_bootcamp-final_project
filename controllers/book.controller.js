const Books = require("../models/book");

//create a new user
const addBook = async (req, res) => {
  const book = new Books(req.body);
  try {
    await book.save();

    res.status(201).send(book);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  addBook,
};
