const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT || "3000", () => {
    console.log(`app is running on port ${process.env.PORT}`);
})