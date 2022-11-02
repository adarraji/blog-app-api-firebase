
const router = require("express").Router();
const { getPosts, addPosts, updatePosts, deletePosts } = require("../controllers/post");

router.get("/", getPosts);
router.get("/:id", getPosts);
router.post("/", addPosts);
router.delete("/:id", updatePosts);
router.put("/:id", deletePosts);


module.exports = router;
