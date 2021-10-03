const crypto = require("crypto");
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
});

imageSchema.statics.hash = function (string) {
  return crypto.createHash("md5").update(string).digest("hex");
};

const Image = mongoose.model("image", imageSchema);

module.exports = Image;
