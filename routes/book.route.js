const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.post("/", (req, res) => {
  bookController.addBook(req, res);
});

module.exports = router;
