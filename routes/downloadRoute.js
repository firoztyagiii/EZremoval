const router = require("express").Router();
const donwloadController = require("../controller/downloadController");

router.route("/:link").get(donwloadController.download);

module.exports = router;
