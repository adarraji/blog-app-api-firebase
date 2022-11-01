const express = require("express");
const knex = require("knex");
require("dotenv").config();

const db = knex({
    client: 'pg',
    connection: process.env.PG_DATABASE_URL,
});

const app = express();
app.use(express.json());


app.listen(process.env.POST || "3000", () => {
    console.log("app is running on port 3000");
})