const pool = require("../../db/db");

const JobsRepository = {
  /**
   * Get all jobs with optional pagination
   */
  getAll: async (offset = 0, limit = 10) => {
    const result = await pool.query(
      "SELECT * FROM jobs ORDER BY created_at DESC OFFSET $1 LIMIT $2",
      [offset, limit]
    );
    return result.rows;
  },

  /**
   * Get a single job by ID
   */
  getById: async (id) => {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    return result.rows[0];
  },

  /**
   * Insert a new job
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

  /**
   * Update an existing job
   */
  update: async (id, job) => {
    const query = `
      UPDATE jobs SET
        title=$1, company=$2, location=$3, employment_type=$4, seniority_level=$5,
        remote=$6, salary_min=$7, salary_max=$8, currency=$9, experience_min=$10,
        skills=$11, description=$12
      WHERE id=$13
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
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  /**
   * Delete a job by ID
   */
  delete: async (id) => {
    const result = await pool.query("DELETE FROM jobs WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
  },
};

module.exports = JobsRepository;
