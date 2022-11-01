const { addPost } = require("../controllers/post");

const router = require("express").Router();

router.get("/test", addPost);

module.exports = router;
