/**
 * Health Controller
 * Provides a simple endpoint to check server and DB status
 */
const pool = require("../../db/db");

const HealthController = {
  /**
   * GET /health
   * Returns server and database status
   */
  checkHealth: async (req, res, next) => {
    try {
      // Check DB connection
      const dbResult = await pool.query("SELECT 1 AS status");
      const dbStatus = dbResult.rows[0].status === 1 ? "OK" : "FAIL";

      res.json({
        status: "OK",
        serverTime: new Date().toISOString(),
        db: dbStatus,
      });
    } catch (err) {
      res.status(500).json({
        status: "FAIL",
        serverTime: new Date().toISOString(),
        db: "FAIL",
        error: err.message,
      });
    }
  },
};

module.exports = HealthController;
