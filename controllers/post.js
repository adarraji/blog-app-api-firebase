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

        // GET POSTS USING POST ID FROM URL. JOINING ON USERS.ID AND POSTS.UID FOREIGN KEY
        // u is alias for users table. p is alias for posts table. userImg is alias for user.img column
        // This is equivalent to postgreSQL query: 'select p.id, username, title, descr, p.img, u.img as userImg, cat, date from users u join posts p on u.id = p.uid where p.id = 14;'

        const data = await db.select("p.id", "username", "title", "descr", "p.img", { userImg: "u.img" }, "cat", "date")
            .from({ u: "users" }).join({ p: "posts" }, "u.id", "=", "p.uid")
            .where("p.id", "=", id);
        res.status(200).json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json("unable to get post");
    }
};

const addPosts = async (req, res) => {
    const { title, descr, img, cat, date } = req.body;

    // GET USER ID. IT WAS ADDED TO THE REQUEST USING VERIFYTOKEN MIDDLEWARE
    const userId = req.userinfo.id

    try {
        const post = await db("posts").insert({ title: title, descr: descr, img: img, cat: cat, date: date, uid: userId }).returning("*");
        res.status(201).json(post);

    } catch (err) {
        res.status(403).json("unable to add post");
    }
};

const updatePosts = async (req, res) => {

    const { title, descr, img, cat } = req.body;

    const postId = req.params.id;

    // GET USER ID. IT WAS ADDED TO THE REQUEST USING VERIFYTOKEN MIDDLEWARE
    const userId = req.userinfo.id;

    // CHECK POST ID IS VALID
    if (isNaN(postId)) {
        return res.status(400).json("Enter a valid post ID");
    }

    try {

        // CHECK IF POST EXISTS
        const post = await db.select("*").from("posts").where("id", "=", postId);
        if (post.length === 0) {
            return res.status(404).json("Post doesn't exist");
        }

        // UPDATE POST. ALLOW ONLY THE UESR SPECIFIED IN posts.uid TO UPDATE THE POST.
        // RETURNS AN ARRAY WITH POST IF POST WAS UPATED
        // RETURNS EMPTY ARRAY IF POST WASN'T UPDATED (EXAMPLE: UID IS NOT THE RIGHT USER)
        const data = await db("posts")
            .update({ title: title, descr: descr, img: img, cat: cat })
            .where("id", "=", postId)
            .andWhere("uid", "=", userId)
            .returning("*");
        if (data.length === 0) {
            return res.status(403).json("You can delete only your post");
        } else {
            return res.status(201).json(data);
        }

    } catch (err) {
        res.status(403).json("unable to add post");
    }

};

const deletePosts = async (req, res) => {
    try {
        const postId = req.params.id;

        // GET USER ID. IT WAS ADDED TO THE REQUEST USING VERIFYTOKEN MIDDLEWARE
        const userId = req.userinfo.id

        // CHECK POST ID IS VALID
        if (isNaN(postId)) {
            return res.status(400).json("Enter a valid post ID");
        }

        // CHECK IF POST EXISTS
        const post = await db.select("*").from("posts").where("id", "=", postId);
        if (post.length === 0) {
            return res.status(404).json("post doesn't exist");
        }

        // DELETE POST. ALLOW ONLY THE UESR SPECIFIED IN posts.uid TO DELETE THE POST.
        // RETURNS 1 IF POST WAS DELETED
        // RETURNS 0 IF POST WASN'T DELETED (EXAMPLE: UID IS NOT THE RIGHT USER)
        const data = await db("posts").where("id", "=", postId).andWhere("uid", "=", userId).del();
        if (!data) {
            return res.status(403).json("You can delete only your post");
        } else {
            return res.status(200).json("Post has been delete");
        }
        // });
    } catch (err) {
        res.status(403).json("unable to delete the post");
    }


};

module.exports = {
    getPosts: getPosts,
    getPost: getPost,
    addPosts: addPosts,
    updatePosts: updatePosts,
    deletePosts: deletePosts
}