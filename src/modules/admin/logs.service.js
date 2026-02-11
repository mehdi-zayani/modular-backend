const pool = require("../../db/db");

const LogsService = {
  async getRecentLogs(limit = 50) {
    const res = await pool.query(
      `SELECT l.id, l.method, l.path, l.status_code, l.ip_address, l.user_agent, l.created_at, u.full_name, u.email
       FROM request_logs l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.created_at DESC
       LIMIT $1`,
      [limit]
    );
    return res.rows;
  },

  async countLogs() {
    const res = await pool.query("SELECT COUNT(*) AS total FROM request_logs");
    return parseInt(res.rows[0].total, 10);
  }
};

module.exports = LogsService;
