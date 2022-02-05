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
    console.log(1);
    if (req.user.books.includes(req.body._id)) {
      throw new Error("Your list already includes this book");
    }
    req.user.books.push(req.body._id);
    console.log(2);
    // const cats = req.body.categories;
    // const genre = req.user.genres;

    // for (const cat of cats) {
    //   req.user.genres[cat] = req.user.genres[cat] + 1 || 1;
    // }
    // console.log(req.body.categories);
    console.log(typeof req.user.books);
    req.body.categories.forEach((cat) => {
      req.user.genres[cat] = req.user.genres[cat] + 1 || 1;
    });
    console.log(3);
    // req.user.genres = [...new Set(req.user.genres)];

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
