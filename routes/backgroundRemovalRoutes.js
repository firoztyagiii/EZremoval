const path = require("path");

const multer = require("multer");
const router = require("express").Router();
const backgroundController = require("../controller/backgroundRemovalController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const bufferStorage = multer.memoryStorage();

// const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
const compress = multer({ storage: bufferStorage });

router
  .route("/")
  .post(upload.single("image"), backgroundController.postImage)
  .get(backgroundController.getIndex);

router
  .route("/compress")
  .get(backgroundController.getCompress)
  .post(compress.single("image"), backgroundController.compressImage);

router
  .route("/resize")
  .get(backgroundController.getResize)
  .post(compress.single("image"), backgroundController.resizeImage);

module.exports = router;
