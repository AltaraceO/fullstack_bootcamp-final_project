const mongoose = require("mongoose");

MONGODB_URL = process.env.MONGODB_URL;

//inside .env the old url myFirstDatabase was Users...

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
