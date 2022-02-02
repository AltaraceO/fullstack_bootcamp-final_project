const Users = require("../models/user");

const addUser = async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = {
  addUser,
};
