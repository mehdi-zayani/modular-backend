const JobsRepository = require("./jobs.repository");

const JobsService = {
  listJobs: async () => {
    return await JobsRepository.getAll();
  },

  /**
   * Create a new job
   */
  createJob: async (jobData) => {
    return await JobsRepository.create(jobData);
  },
};

module.exports = JobsService;
