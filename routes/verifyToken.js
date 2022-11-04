const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // CHECK IF THERE IS A TOKEN
    if (!token) {
        return res.status(401).json("Not authenticated");
    }

    // VERIFY TOKEN. USE THE JWT SECRET KEY. IT RETURNS USER ID BECAUSE IT WAS USED TO CREATE THE TOKEN WHEN USER LOGGED IN
    jwt.verify(token, process.env.JWT_SEC, async (err, userinfo) => {

        // INVALID TOKEN
        if (err) {
            return res.status(403).json("Token is not valid");
        }

        else {
            req.userinfo = userinfo;
            next();
        }
    });
}

module.exports = { verifyToken };