const db = require("../db");

const getPosts = async (req, res) => {
    const category = req.query.cat;
    try {

        // CHECK IF THERE IS A CATEGORY QUERY IN URL
        if (category) {

            // GET ALL POSTS FOR THAT CATEGORY
            const data = await db.select("*").from("posts").where("cat", "=", category);
            res.status(200).json(data);

            // IF THERE NO QUERY IN URL, GET ALL POSTS
        } else {
            const data = await db.select("*").from("posts");
            res.status(200).json(data);
        }

    } catch (err) {
        res.status(400).json("unable to get posts");
    }

};

const getPost = (req, res) => {

};

const addPosts = (req, res) => {

};

const updatePosts = (req, res) => {

};

const deletePosts = (req, res) => {

};

module.exports = {
    getPosts: getPosts,
    getPost: getPost,
    addPosts: addPosts,
    updatePosts: updatePosts,
    deletePosts: deletePosts
}