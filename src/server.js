const app = require("./app");
const pool = require("./db/db");
const config = require("./config/env");

const PORT = config.port;

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

startServer();
