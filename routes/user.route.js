const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", (req, res) => {
  userController.addUser(req, res);
});

module.exports = router;
