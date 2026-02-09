const JobsService = require("./jobs.service");
const { NotFoundError } = require("../../errors");

/**
 * Controller for jobs endpoints
 */
const JobsController = {
  getJobs: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const jobs = await JobsService.listJobs(page, limit);
      res.json(jobs);
    } catch (err) {
      next(err);
    }
  },

  getJobById: async (req, res, next) => {
    try {
      const job = await JobsService.getJob(req.params.id);
      if (!job) throw new NotFoundError("Job not found");

      res.json(job);
    } catch (err) {
      next(err);
    }
  },

  createJob: async (req, res, next) => {
    try {
      const job = await JobsService.createJob(req.body);
      res.status(201).json(job);
    } catch (err) {
      next(err);
    }
  },

  updateJob: async (req, res, next) => {
    try {
      const job = await JobsService.updateJob(req.params.id, req.body);
      if (!job) throw new NotFoundError("Job not found");

      res.json(job);
    } catch (err) {
      next(err);
    }
  },

  deleteJob: async (req, res, next) => {
    try {
      const job = await JobsService.deleteJob(req.params.id);
      if (!job) throw new NotFoundError("Job not found");

      res.json({ message: "Job deleted successfully" });
    } catch (err) {
      next(err);
    }
  },

  /**
   * PATCH /jobs/:id
   * Update only provided fields
   */
  patchJob: async (req, res, next) => {
    try {
      const job = await JobsService.patchJob(req.params.id, req.body);
      if (!job) {
        throw new NotFoundError(
          "Job not found or no fields provided"
        );
      }

      res.json(job);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = JobsController;
