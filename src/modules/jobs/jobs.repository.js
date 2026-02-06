const pool = require("../../db/db");

const JobsRepository = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
    return result.rows;
  },

  /**
   * Insert a new job into the database
   */
  create: async (job) => {
    const query = `
      INSERT INTO jobs
        (title, company, location, employment_type, seniority_level, remote, salary_min, salary_max, currency, experience_min, skills, description)
      VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *;
    `;
    const values = [
      job.title,
      job.company,
      job.location,
      job.employment_type,
      job.seniority_level,
      job.remote,
      job.salary_min,
      job.salary_max,
      job.currency,
      job.experience_min,
      job.skills,
      job.description,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = JobsRepository;
