const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: "./config.env",
});

const app = express();
app.use(express.static("public"));

app.use(cors());

const backgroundController = require("./routes/backgroundRemovalRoutes");

app.use(backgroundController);

module.exports = app;
