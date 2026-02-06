const JobsService = require("./jobs.service");

/**
 * Controller for jobs endpoints
 */
const JobsController = {
  getJobs: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const jobs = await JobsService.listJobs(page, limit);
      res.json(jobs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getJobById: async (req, res) => {
    try {
      const job = await JobsService.getJob(req.params.id);
      if (!job) return res.status(404).json({ error: "Job not found" });
      res.json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createJob: async (req, res) => {
    try {
      const job = await JobsService.createJob(req.body);
      res.status(201).json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateJob: async (req, res) => {
    try {
      const job = await JobsService.updateJob(req.params.id, req.body);
      if (!job) return res.status(404).json({ error: "Job not found" });
      res.json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteJob: async (req, res) => {
    try {
      const job = await JobsService.deleteJob(req.params.id);
      if (!job) return res.status(404).json({ error: "Job not found" });
      res.json({ message: "Job deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /**
   * PATCH /jobs/:id
   * Update only provided fields
   */
  patchJob: async (req, res) => {
    try {
      const job = await JobsService.patchJob(req.params.id, req.body);
      if (!job) return res.status(404).json({ error: "Job not found or no fields provided" });
      res.json(job);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = JobsController;
