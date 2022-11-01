const knex = require("knex");

const db = knex({
    client: 'pg',
    connection: process.env.PG_DATABASE_URL,
});

module.exports = db;