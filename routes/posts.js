const router = require("express").Router();

router.get("/test", (req, res) => {
    res.json("This is post");
});

module.exports = router;
