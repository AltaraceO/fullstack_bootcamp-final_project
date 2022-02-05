const jwt = require("jsonwebtoken");
const Users = require("../models/user");

const auth = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(2);
    const user = await Users.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(3);
    if (!user) {
      throw new Error("No user found");
    }
    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(400).send({
      error: "Please authenticate",
    });
  }
};

module.exports = auth;
