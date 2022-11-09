const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");


require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    return res.status(200).json(file.filename);
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.POST || "3000", () => {
    console.log("app is running on port 3000");
})