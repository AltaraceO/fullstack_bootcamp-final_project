const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bookController = require("../controllers/book.controller");

router.post("/", (req, res) => {
  bookController.addBook(req, res);
});

router.get("/getBooks", auth, (req, res) => {
  bookController.getBooks(req, res);
});

router.get("/getGenres", auth, (req, res) => {
  bookController.getGenres(req, res);
});

router.post("/comment", auth, (req, res) => {
  bookController.addComment(req, res);
});

router.post("/checkBooks", (req, res) => {
  bookController.checkBooks(req, res);
});

router.post("/lik", auth, (req, res) => {
  bookController.like(req, res);
});

module.exports = router;
