const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Wheeldeal");
});

module.exports = app;