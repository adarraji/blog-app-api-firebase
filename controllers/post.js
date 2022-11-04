const db = require("../db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { json } = require("express");


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
        res.status(500).json("unable to get posts");
    }

};

const getPost = async (req, res) => {
    const id = req.params.id;
    try {

        // GET POSTS USING USER ID FROM URL. JOINING ON USERS.ID AND POSTS.UID FOREIGN KEY
        // u is alias for users table. p is alias for posts table. userImg is alias for user.img column
        // This is equivalent to postgreSQL query: 'select p.id, username, title, descr, p.img, u.img as userImg, cat, date from users u join posts p on u.id = p.uid;'

        const data = await db.select("p.id", "username", "title", "descr", "p.img", { userImg: "u.img" }, "cat", "date")
            .from({ u: "users" }).join({ p: "posts" }, "u.id", "=", "p.uid")
            .where("p.uid", "=", id);

        res.status(200).json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json("unable to get post");
    }
};

const addPosts = (req, res) => {

};

const updatePosts = (req, res) => {

};

const deletePosts = async (req, res) => {
    const token = req.cookies.access_token;

    // CHECK IF THERE IS A TOKEN
    if (!token) {
        return res.status(401).json("Not authenticated");
    }

    try {

        // VERIFY TOKEN. USE THE JWT SECRET KEY. IT RETURNS USER ID BECAUSE IT WAS USED TO CREATE THE TOKEN WHEN USER LOGGED IN
        jwt.verify(token, process.env.JWT_SEC, async (err, userinfo) => {

            // INVALID TOKEN
            if (err) {
                return res.status(403).json("Token is not valid");
            }


            const postTd = req.params.id;

            // CHECK IF POST EXISTS
            const post = await db.select("*").from("posts").where("id", "=", postTd);
            if (post.length === 0) {
                return res.status(404).json("post doesn't exist");
            }

            // DELETE POST. ALLOW ONLY THE UESR SPECIFIED IN posts.uid TO DELETE THE POST.
            // RETURNS 1 IF POST WAS DELETED
            // RETURNS 0 IF POST WASN'T DELETED (EXAMPLE: UID IS NOT THE RIGHT USER)
            const data = await db("posts").where("id", "=", postTd).andWhere("uid", "=", userinfo.id).del();
            if (!data) {
                return res.status(403).json("You can delete only your post");
            } else {
                return res.status(200).json("Post has been delete");
            }
        });
    } catch (err) {
        res.status(403).json("Can't delete the post");
    }


};

module.exports = {
    getPosts: getPosts,
    getPost: getPost,
    addPosts: addPosts,
    updatePosts: updatePosts,
    deletePosts: deletePosts
}