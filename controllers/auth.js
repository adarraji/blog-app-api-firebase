const db = require("../db");

const register = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json("Invalid form submission");
    }

    try {
        const user = await db("users").insert({ username: username, email: email, password: password }).returning("username");
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(400).json("unable to register");
    }
};

const login = (req, res) => {

};

const logout = (req, res) => {

};

module.exports = {
    register: register,
    login: login,
    logout: logout
};