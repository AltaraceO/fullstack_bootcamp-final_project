const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.post("/", (req, res) => {
  userController.addUser(req, res);
});

router.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

router.post("/logoutAll", auth, (req, res) => {
  userController.logoutAll(req, res);
});

router.post("/addBook", auth, (req, res) => {
  userController.addBook(req, res);
});

module.exports = router;
