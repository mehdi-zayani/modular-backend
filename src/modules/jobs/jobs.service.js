const JobsRepository = require("./jobs.repository");
const pool = require("../../db/db");

/**
 * Service layer for jobs module
 */
const JobsService = {
  /**
   * List jobs with pagination
   */
  listJobs: async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await JobsRepository.getAll(offset, limit);
  },

  /**
   * Retrieve a single job by ID
   */
  getJob: async (id) => {
    return await JobsRepository.getById(id);
  },

  /**
   * Create a new job
   */
  createJob: async (jobData) => {
    return await JobsRepository.create(jobData);
  },

  /**
   * Update a job completely
   */
  updateJob: async (id, jobData) => {
    return await JobsRepository.update(id, jobData);
  },

  /**
   * Soft delete a job
   */
  deleteJob: async (id) => {
    return await JobsRepository.delete(id);
  },

  /**
   * Update only provided fields
   */
  patchJob: async (id, fields) => {
    return await JobsRepository.updatePartial(id, fields);
  },

  /**
   * Count total number of jobs
   */
  countJobs: async () => {
    const result = await pool.query("SELECT COUNT(*) FROM jobs");
    return parseInt(result.rows[0].count, 10);
  },

  /**
   * Count jobs grouped by employment type
   */
  countJobsByEmploymentType: async () => {
    const result = await pool.query(
      "SELECT employment_type, COUNT(*) AS count FROM jobs GROUP BY employment_type"
    );
    return result.rows; // [{employment_type: 'FULLTIME', count: 5}, ...]
  },
};

module.exports = JobsService;
