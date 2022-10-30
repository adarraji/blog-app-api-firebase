const expres = require("express");
const knex = require("knex");
require("dotenv").config();

const db = knex({
    client: 'pg',
    connection: process.env.PG_DATABASE_URL,
});

console.log(db.select("*").from("users"));

const app = expres();
app.use(expres.json());


app.listen(process.env.POST || "3000", () => {
    console.log("app is running on port 3000");
})