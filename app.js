const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: "./config.env",
});

const app = express();
app.use(express.static("public"));
app.use(express.static("uploads"));

app.use(cors());

const backgroundRemovingRoute = require("./routes/backgroundRemovalRoutes");
const downloadRoute = require("./routes/downloadRoute");

app.use(backgroundRemovingRoute);

app.use("/v", downloadRoute);

module.exports = app;
