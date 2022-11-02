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

const getPost = async (req, res) => {
    const id = req.params.id;
    try {

        // GET POSTS USING USER ID FROM URL. JOINING ON USERS.ID AND POSTS.UID FOREIGN KEY
        // u is alias for users table. p is alias for posts table. userImg is alias for user.img column
        // This is ewuivelent to postgreSQL query: 'select p.id, username, title, descr, p.img, u.img as userImg, cat, date from users u join posts p on u.id = p.uid;'

        const data = await db.select("p.id", "username", "title", "descr", "p.img", { userImg: "u.img" }, "cat", "date")
            .from({ u: "users" }).join({ p: "posts" }, "u.id", "=", "p.uid")
            .where("p.uid", "=", id);

        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json("unable to get post");
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
    getPost: getPost,
    addPosts: addPosts,
    updatePosts: updatePosts,
    deletePosts: deletePosts
}