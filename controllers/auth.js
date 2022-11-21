const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {

    const { username, email, password } = req.body;

    // CHECK IF FIELDS ARE EMPTY
    if (!username || !email || !password) {
        return res.status(400).json("Invalid form submission");
    }

    // HASH THE PASSWORD        
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    try {

        // CHECK EXISTING USER
        const data = await db.select("*").from("users").where("username", "=", username).orWhere("email", "=", email);

        if (data.length) {
            return res.status(400).json("User already exists");
        }

        // INSERT USER
        const user = await db("users").insert({ username: username, email: email, password: hash }).returning("username");
        return res.status(201).json(user);
    }
    catch (err) {
        return res.status(400).json("unable to register");
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    // CHECK IF FIELDS ARE EMPTY
    if (!username || !password) {
        return res.status(400).json("Invalid form submission");
    }

    try {

        // CHECK IF USER EXISTS IN DB. RETURNS AN ARRAY WITH 1 OBJECT THAT CONTAINS USER INFO (ROW)
        const data = await db.select("*").from("users").where("username", "=", username);

        if (data.length === 0) {
            return res.status(404).json("Wrong username");
        }

        // COMPARE PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong password")
        }

        // CREATE TOKEN USING ID FROM USERS TABLE BECAUSE IT'S FORIEGN KEY IN POSTS TABLE. SO USER AFTER LOGIN WILL CHANGE ONLY POSTS FOR THAT USER
        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SEC);

        // REMOVE PASSWORD FROM RETURNED DATA
        const { password, ...other } = data[0];

        // RESPONSE WITH COOCKIE AND DATA WITHOUT PASSOWRD
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);
    }
    catch (err) {
        return res.status(400).json("unable to login");
    }
};

const logout = (req, res) => {

    // CLEAR COOKIE
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out");

};

module.exports = {
    register: register,
    login: login,
    logout: logout
};