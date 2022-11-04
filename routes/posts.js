
const router = require("express").Router();
const { getPosts, getPost, addPosts, updatePosts, deletePosts } = require("../controllers/post");
const { verifyToken } = require("./verifyToken");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPosts);
router.delete("/:id", verifyToken, deletePosts);  // Apply verifyToken middleware
router.put("/:id", updatePosts);



module.exports = router;
