const JobsRepository = require("./jobs.repository");

/**
 * Service layer for jobs
 */
const JobsService = {
  listJobs: async () => {
    return await JobsRepository.getAll();
  },
};

module.exports = JobsService;
