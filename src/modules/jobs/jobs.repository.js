const pool = require("../../db/db");

/**
 * Repository for jobs table
 */
const JobsRepository = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
    return result.rows;
  },
};

module.exports = JobsRepository;
