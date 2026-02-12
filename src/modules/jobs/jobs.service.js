const JobsRepository = require("./jobs.repository");
const pool = require("../../db/db");

/**
 * Service layer for jobs module
 * Handles business logic for jobs
 */
const JobsService = {
  /**
   * List jobs with pagination and optional filters
   * @param {Object} options
   * @param {Object} options.filters - optional filters { employment_type, location, status }
   * @param {number} options.offset - offset for pagination
   * @param {number} options.limit - number of items per page
   * @returns {Object} { jobs: [], total: number }
   */
  listJobs: async ({ filters = {}, offset = 0, limit = 10 }) => {
    return await JobsRepository.getAll({ filters, offset, limit });
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
   * Partial update (PATCH) of job fields
   */
  patchJob: async (id, fields) => {
    return await JobsRepository.updatePartial(id, fields);
  },

  /**
   * Soft delete a job (admin only)
   */
  deleteJob: async (id) => {
    return await JobsRepository.delete(id);
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
