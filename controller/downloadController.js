const Image = require("../model/image");

exports.download = async (req, res, next) => {
  const img = await Image.findOne({ link: req.params.link });
  res.redirect(`http://localhost:3000${img.path}`);
};
