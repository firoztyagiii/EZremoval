const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: {
    type: "String",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
  link: {
    type: String,
    required: true,
  },
  downloads: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Image = mongoose.model("image", imageSchema);

module.exports = Image;
