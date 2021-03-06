const Users = require("../models/user");

//create a new user
const addUser = async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: "All logged out" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addBook = async (req, res) => {
  try {
    if (req.user.books.includes(req.body._id)) {
      throw new Error("Your list already includes this book");
    }
    req.user.books.push({ _id: req.body._id });

    //repeated categories are counted for each user
    req.body.categories.forEach((cat) => {
      if (!req.user.genres.find((e) => e.genre === cat)) {
        req.user.genres.push({ genre: cat, value: 1 });
        return;
      }
      req.user.genres.forEach((e) => {
        if (e.genre === cat) {
          e.value++;
        }
      });
    });

    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.send(err);
  }
};

const removeBook = async (req, res) => {
  try {
    const newList = req.user.books.filter((book) => book._id !== req.body._id);

    req.user.books = newList;

    await req.user.save();

    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const likeBook = async (req, res) => {
  try {
    const books = req.user.books.map((book) => {
      if (book._id === req.body._id) {
        book.like = true;
      }
      return book;
    });
    await Users.findByIdAndUpdate(req.user._id, {
      $set: { books },
    });
    await req.user.save();
    res.status(201).send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};
const unlikeBook = async (req, res) => {
  try {
    const books = req.user.books.map((book) => {
      if (book._id === req.body._id) {
        book.like = false;
      }
      return book;
    });
    await Users.findByIdAndUpdate(req.user._id, {
      $set: { books },
    });
    req.user.save();
    res.status(201).send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};
const readBook = async (req, res) => {
  try {
    const books = req.user.books.map((book) => {
      if (book._id === req.body._id) {
        book.read = true;
      }
      return book;
    });
    await Users.findByIdAndUpdate(req.user._id, {
      $set: { books },
    });
    await req.user.save();
    res.status(201).send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};
const notReadBook = async (req, res) => {
  try {
    const books = req.user.books.map((book) => {
      if (book._id === req.body._id) {
        book.read = false;
      }
      return book;
    });
    await Users.findByIdAndUpdate(req.user._id, {
      $set: { books },
    });
    req.user.save();
    res.status(201).send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const avatar = async (req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();
  console.log(req.file.buffer);
  // console.log(req.user);
  res.send(req.user);
};

const getUser = async (req, res) => {
  try {
    res.status(201).send(req.user);
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addUser,
  loginUser,
  logoutAll,
  addBook,
  removeBook,
  likeBook,
  unlikeBook,
  readBook,
  notReadBook,
  avatar,
  getUser,
  deleteUser,
};
