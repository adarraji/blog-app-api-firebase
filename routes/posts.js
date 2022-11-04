
const router = require("express").Router();
const { getPosts, getPost, addPosts, updatePosts, deletePosts } = require("../controllers/post");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPosts);
router.delete("/:id", deletePosts);
router.put("/:id", updatePosts);



module.exports = router;
