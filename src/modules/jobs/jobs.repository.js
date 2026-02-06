const pool = require("../../db/db");

/**
 * Repository layer for jobs module
 */
const JobsRepository = {
  getAll: async (offset = 0, limit = 10) => {
    const result = await pool.query(
      "SELECT * FROM jobs ORDER BY created_at DESC OFFSET $1 LIMIT $2",
      [offset, limit]
    );
    return result.rows;
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

  /**
   * Update only the provided fields of a job
   */
  updatePartial: async (id, fields) => {
    const setClauses = [];
    const values = [];
    let i = 1;

    for (const key in fields) {
      setClauses.push(`${key}=$${i}`);
      values.push(fields[key]);
      i++;
    }

    if (setClauses.length === 0) return null;

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
