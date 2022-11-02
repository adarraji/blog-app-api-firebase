const db = require("../db");

const getPosts = async (req, res) => {
    const category = req.query.cat;
    try {
        if (category) {
            const data = await db.select("*").from("posts").where("cat", "=", category);
            res.status(200).json(data);
        } else {
            const data = await db.select("*").from("posts");
            res.status(200).json(data);
        }

    } catch (err) {
        res.status(400).json("unable to get posts");
    }

};

const addPosts = (req, res) => {

};

const updatePosts = (req, res) => {

};

const deletePosts = (req, res) => {

};

module.exports = {
    getPosts: getPosts,
    addPosts: addPosts,
    updatePosts: updatePosts,
    deletePosts: deletePosts
}