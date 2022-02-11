const express = require("express");
const router = express.Router();
const multer = require("multer");
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

router.post("/removeBook", auth, (req, res) => {
  userController.removeBook(req, res);
});

router.post("/likeBook", auth, (req, res) => {
  userController.likeBook(req, res);
});

router.post("/unlikeBook", auth, (req, res) => {
  userController.unlikeBook(req, res);
});

router.post("/readBook", auth, (req, res) => {
  userController.readBook(req, res);
});

router.post("/notReadBook", auth, (req, res) => {
  userController.notReadBook(req, res);
});

//middleware for uploading files MULTER
const upload = multer({
  //destination folder
  // dest: "avatar",
  limits: {
    //restrict to 1megaByte
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("file must be an image"));
    }
    cb(undefined, true);
  },
});

router.post("/avatar", auth, upload.single("avatar"), (req, res) => {
  userController.avatar(req, res);
});

router.get("/getUser", auth, (req, res) => {
  userController.getUser(req, res);
});

module.exports = router;
