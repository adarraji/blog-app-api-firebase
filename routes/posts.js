const router = require("express").Router();

router.get("/", (req, res) => {
    res.json("This is post");
});

module.exports = router;
