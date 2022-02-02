const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    required: true,
    type: String,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Cannot include the word 'password'");
      }
    },
  },
  //Reference to the books that the user added to the list
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  ],
  genres: [
    {
      type: String,
    },
  ],
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
