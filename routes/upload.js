const router = require("express").Router();
const { getFileName } = require("../controllers/upload");
const { verifyToken } = require("./verifyToken");
const { upload } = require("./multer");

router.post("/", verifyToken, upload.single("file"), getFileName)

module.exports = router;