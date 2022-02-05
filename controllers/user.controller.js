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
    req.user.books.push(req.body._id);

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

module.exports = {
  addUser,
  loginUser,
  logoutAll,
  addBook,
};
