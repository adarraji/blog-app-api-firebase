const db = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

        // CHECK IF USER EXISTS IN DB
        const data = await db.select("*").from("users").where("username", "=", username);

        if (data.length === 0) {
            return res.status(404).json("Wrong username or password");

        }

        // COMPARE PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or password")
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json("unable to login");
    }

};

const logout = (req, res) => {

};

module.exports = {
    register: register,
    login: login,
    logout: logout
};