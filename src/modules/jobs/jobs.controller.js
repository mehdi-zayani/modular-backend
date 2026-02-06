const JobsService = require("./jobs.service");

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

  /**
   * POST /jobs
   */
  createJob: async (req, res) => {
    try {
      const job = await JobsService.createJob(req.body);
      res.status(201).json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = JobsController;
