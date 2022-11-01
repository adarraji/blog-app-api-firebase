const express = require("express");
const knex = require("knex");
require("dotenv").config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

const db = knex({
    client: 'pg',
    connection: process.env.PG_DATABASE_URL,
});

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


app.listen(process.env.POST || "3000", () => {
    console.log("app is running on port 3000");
})