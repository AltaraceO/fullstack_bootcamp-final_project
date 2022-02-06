require("dotenv").config({ path: "./config.env" });
const express = require("express");
require("./db/mongoose");
const path = require("path");
const cors = require("cors");
const route = require("./routes/index.routes");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", route);

const publicPath = path.join(__dirname, "client/build");
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is serving on port ${PORT}`);
});
