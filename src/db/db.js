const { Pool } = require("pg");
const config = require("../config/env");

const pool = new Pool(config.db);

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("PostgreSQL error:", err);
});

module.exports = pool;
