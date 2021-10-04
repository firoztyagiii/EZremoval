const { removeBackgroundFromImageFile } = require("remove.bg");
const path = require("path");
const fs = require("fs");
const Image = require("../model/image");
const sharp = require("sharp");

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

exports.getIndex = (req, res, next) => {
  res.render("_layout", {
    link: "index",
    heroTitle: "Remove Image Background Fast",
  });
};

exports.getCompress = (req, res, next) => {
  res.render("_layout", {
    link: "compress",
    heroTitle: "Compress image in just 2 secs",
  });
};

exports.getResize = (req, res, next) => {
  res.render("_layout", { link: "resize", heroTitle: "Resize images" });
};

exports.compressImage = async (req, res, next) => {
  try {
    const quality = 100 - req.body.quality * 1;
    const buffer = await sharp(req.file.buffer)
      .jpeg({ mozjpeg: true, quality: +quality })
      .toBuffer();

    const randomHashForImg = Image.hash(Date.now().toString());

    const imgFileName = `${Date.now()}-${randomHashForImg}-${
      req.file.originalname
    }`;

    fs.writeFileSync(
      path.join(__dirname, `../public/uploads/compressed-${imgFileName}`),
      buffer
    );

    const hash = Image.hash(req.file.originalname);

    const img = await Image.create({
      link: hash,
      path: `/uploads/compressed-${imgFileName}`,
    });

    res.status(200).json({
      status: "success",
      path: img.link,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.resizeImage = async (req, res, next) => {
  const randomHashForImg = Image.hash(Date.now().toString());
  const imgFileName = `${Date.now()}-${randomHashForImg}-${
    req.file.originalname
  }`;
  const buffer = await sharp(req.file.buffer)
    .resize({
      width: +req.body.width,
      height: +req.body.height,
    })
    .jpeg({ quality: 100 })
    .toBuffer();

  fs.writeFileSync(
    path.join(__dirname, `../public/uploads/resized-${imgFileName}`),
    buffer
  );

  const hash = Image.hash(req.file.originalname);

  const img = await Image.create({
    link: `${Date.now()}${hash}`,
    path: `/uploads/resized-${imgFileName}`,
  });

  res.status(200).json({
    status: "success",
    path: img.link,
  });
};
