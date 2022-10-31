const expres = require("express");
const knex = require("knex");
require("dotenv").config();

const db = knex({
    client: 'pg',
    connection: process.env.PG_DATABASE_URL,
});

// db("users").insert({
//     email: "tes23@gmail.com",
//     name: "user2",
//     joined: new Date()
// }).then(console.log)

db.select("*").from("users").then(data => {
    console.log(data);
})

const app = expres();
app.use(expres.json());


app.listen(process.env.POST || "3000", () => {
    console.log("app is running on port 3000");
})