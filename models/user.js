const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  //Reference to the books that the user added to the list
  books: [
    {
      _id: String,
      like: {
        type: Boolean,
        required: true,
        default: false,
      },
      read: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  //this allows me to save any 'type' under genre
  genres: [
    {
      genre: String,
      value: Number,
    },
  ],
  avatar: {
    type: Buffer,
  },
});

//when signing up or logging in this will create a fresh token to save in client's local storage
usersSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//when the user is sent to client it wont include the password or the tokens
usersSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//confirming users as they log, finding by unique email and matching passwords
usersSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email: email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//Hash password before saving
usersSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
