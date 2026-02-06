const JobsRepository = require("./jobs.repository");

/**
 * Service layer for jobs module
 */
const JobsService = {
  listJobs: async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await JobsRepository.getAll(offset, limit);
  },

  getJob: async (id) => {
    return await JobsRepository.getById(id);
  },

  createJob: async (jobData) => {
    return await JobsRepository.create(jobData);
  },

  updateJob: async (id, jobData) => {
    return await JobsRepository.update(id, jobData);
  },

  deleteJob: async (id) => {
    return await JobsRepository.delete(id);
  },

  /**
   * Update only provided fields
   */
  patchJob: async (id, fields) => {
    return await JobsRepository.updatePartial(id, fields);
  },
};

module.exports = JobsService;
