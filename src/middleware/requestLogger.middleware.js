const pool = require("../db/db");

/**
 * Middleware to log each incoming request
 */
async function requestLogger(req, res, next) {
  const start = Date.now();

  // On finish response, log the request
  res.on("finish", async () => {
    try {
      const userId = req.user ? req.user.id : null;
      const { method, originalUrl: path } = req;
      const statusCode = res.statusCode;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"] || null;

      const query = `
        INSERT INTO request_logs
        (user_id, method, path, status_code, ip_address, user_agent)
        VALUES ($1,$2,$3,$4,$5,$6)
      `;
      const values = [userId, method, path, statusCode, ipAddress, userAgent];

      await pool.query(query, values);
    } catch (err) {
      console.error("Request logging failed:", err);
    }
  });

  next();
}

module.exports = requestLogger;
