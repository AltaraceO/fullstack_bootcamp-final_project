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

router.post("/like", auth, (req, res) => {
  bookController.like(req, res);
});

router.post("/unlike", auth, (req, res) => {
  bookController.unlike(req, res);
});

router.post("/read", auth, (req, res) => {
  bookController.read(req, res);
});

router.post("/notRead", auth, (req, res) => {
  bookController.notRead(req, res);
});

module.exports = router;
