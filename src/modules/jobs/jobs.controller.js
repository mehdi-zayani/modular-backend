const JobsService = require("./jobs.service");
const { NotFoundError } = require("../../errors");

/**
 * Controller for jobs endpoints
 * Handles public and authenticated job operations
 */
const JobsController = {
/**
 * GET /jobs
 * Public endpoint to list jobs with optional pagination and filters
 * Query params: page, limit, employment_type, location, status
 */
  getJobs: async (req, res, next) => {
    try {
      // Pagination defaults
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Build filters object from query params
      const filters = {};
      if (req.query.employment_type) filters.employment_type = req.query.employment_type;
      if (req.query.location) filters.location = req.query.location;
      if (req.query.status) filters.status = req.query.status;

      // Call service layer
      const { jobs, total } = await JobsService.listJobs({ filters, offset, limit });

      // Return paginated response
      res.json({
        data: jobs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (err) {
      next(err);
    }
  },


  /**
   * GET /jobs/:id
   * Retrieve a single job by ID
   */
  getJobById: async (req, res, next) => {
    try {
      const job = await JobsService.getJob(req.params.id);
      if (!job) throw new NotFoundError("Job not found");

      res.json(job);
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /jobs
   * Create a new job
   * Protected route for authenticated users
   */
  createJob: async (req, res, next) => {
    try {
      const job = await JobsService.createJob(req.body);
      res.status(201).json(job);
    } catch (err) {
      next(err);
    }
  },

  /**
   * PUT /jobs/:id
   * Update a job completely
   * Protected route
   */
  updateJob: async (req, res, next) => {
    try {
      const job = await JobsService.updateJob(req.params.id, req.body);
      if (!job) throw new NotFoundError("Job not found");

      res.json(job);
    } catch (err) {
      next(err);
    }
  },

  /**
   * PATCH /jobs/:id
   * Partial update of job fields
   */
  patchJob: async (req, res, next) => {
    try {
      const job = await JobsService.patchJob(req.params.id, req.body);
      if (!job) throw new NotFoundError("Job not found or no fields provided");

      res.json(job);
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /jobs/:id
   * Remove a job (admin only)
   */
  deleteJob: async (req, res, next) => {
    try {
      const job = await JobsService.deleteJob(req.params.id);
      if (!job) throw new NotFoundError("Job not found");

      res.json({ message: "Job deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = JobsController;
