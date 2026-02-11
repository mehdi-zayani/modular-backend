const pool = require("../db/db");

async function requestLogger(req, res, next) {
  const { method, originalUrl } = req;
  const userId = req.user?.id || null; // si user connecté via JWT
  const timestamp = new Date();

  try {
    await pool.query(
      `INSERT INTO request_logs(user_id, method, endpoint, created_at) VALUES($1, $2, $3, $4)`,
      [userId, method, originalUrl, timestamp]
    );
  } catch (err) {
    console.error("Failed to log request:", err);
  }

  next();
}

module.exports = requestLogger;