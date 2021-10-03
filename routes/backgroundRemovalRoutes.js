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

// const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.route("/").post(upload.single("image"), backgroundController.postImage);

module.exports = router;
