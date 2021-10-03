const { removeBackgroundFromImageFile } = require("remove.bg");
const path = require("path");
const fs = require("fs");
const Image = require("../model/image");

exports.postImage = async (req, res, next) => {
  try {
    const result = await removeBackgroundFromImageFile({
      path: req.file.path,
      apiKey: process.env.REMOVAL_API,
      size: "regular",
      type: "person",
      crop: false,
      scale: "100%",
      outputFile: path.join(
        req.file.destination,
        `removed-${req.file.filename}`
      ),
    });

    fs.unlink(
      path.join(__dirname, `../public/uploads/${req.file.filename}`),
      (err, file) => {
        if (err) {
          console.log(err);
        }
      }
    );

    const hash = Image.hash(req.file.filename);

    const img = await Image.create({
      link: hash,
      path: `/uploads/removed-${req.file.filename}`,
    });

    res.status(200).json({
      status: "success",
      path: img.link,
    });
  } catch (err) {
    console.log(err);
  }
};
