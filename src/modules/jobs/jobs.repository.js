const pool = require("../../db/db");

/**
 * Repository layer for jobs module
 * Handles direct database queries for jobs
 */
const JobsRepository = {
  /**
   * Get all jobs with pagination and optional filters
   * @param {Object} options
   * @param {Object} options.filters - { employment_type, location, remote }
   * @param {number} options.offset
   * @param {number} options.limit
   * @returns {Object} { jobs: [], total: number }
   */
  getAll: async ({ filters = {}, offset = 0, limit = 10 } = {}) => {
    const conditions = [];
    const values = [];
    let i = 1;

    // Dynamic WHERE clauses
    if (filters.employment_type) {
      conditions.push(`employment_type = $${i}`);
      values.push(filters.employment_type);
      i++;
    }
    if (filters.location) {
      conditions.push(`location ILIKE $${i}`);
      values.push(`%${filters.location}%`);
      i++;
    }
    if (typeof filters.remote !== "undefined") {
      conditions.push(`remote = $${i}`);
      values.push(filters.remote);
      i++;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    // Total count query
    const countQuery = `SELECT COUNT(*) AS total FROM jobs ${whereClause};`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].total, 10);

    // Data query with pagination
    const dataQuery = `
      SELECT * FROM jobs
      ${whereClause}
      ORDER BY created_at DESC
      OFFSET $${i} LIMIT $${i + 1};
    `;
    values.push(offset, limit);
    const result = await pool.query(dataQuery, values);

    return { jobs: result.rows, total };
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    return result.rows[0];
  },

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

  delete: async (id) => {
    const result = await pool.query("DELETE FROM jobs WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
  },

  updatePartial: async (id, fields) => {
    const setClauses = [];
    const values = [];
    let i = 1;

    for (const key in fields) {
      setClauses.push(`${key}=$${i}`);
      values.push(fields[key]);
      i++;
    }

    if (!setClauses.length) return null;

    const query = `
      UPDATE jobs
      SET ${setClauses.join(", ")}
      WHERE id=$${i}
      RETURNING *;
    `;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = JobsRepository;
