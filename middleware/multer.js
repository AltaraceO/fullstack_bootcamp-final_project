const multer = require("multer");
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

module.exports = upload;
