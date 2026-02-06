const JobsService = require("./jobs.service");

/**
 * Controller for jobs routes
 */
const JobsController = {
  getJobs: async (req, res) => {
    try {
      const jobs = await JobsService.listJobs();
      res.json(jobs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = JobsController;
