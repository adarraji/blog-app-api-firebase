
const router = require("express").Router();
const { getPosts, getPost, addPosts, updatePosts, deletePosts } = require("../controllers/post");
const { verifyToken } = require("./verifyToken");

router.get("/", getPosts);
router.get("/:id", getPost);

// Apply verifyToken middleware to make sure user is logged in
router.post("/", verifyToken, addPosts);
router.delete("/:id", verifyToken, deletePosts);
router.put("/:id", updatePosts);



module.exports = router;
