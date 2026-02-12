const express = require("express");
const JobsController = require("./jobs.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/authorize.middleware");
const validate = require("../../middleware/validate.middleware");
const { jobSchema } = require("../../validation/job.validation");

const router = express.Router();

/**
 * -------------------------
 * Public routes (no authentication required)
 * -------------------------
 */

/**
 * GET /jobs
 * Public endpoint to list jobs with optional pagination & filters
 * Query params: page, limit, employment_type, location, remote
 */
router.get("/", JobsController.getJobs);

/**
 * GET /jobs/:id
 * Retrieve a single job by ID
 */
router.get("/:id", JobsController.getJobById);

/**
 * -------------------------
 * Authenticated users routes
 * -------------------------
 */

/**
 * POST /jobs
 * Create a new job (any authenticated user)
 */
router.post(
  "/",
  authMiddleware(), 
  validate(jobSchema),
  JobsController.createJob
);

/**
 * PUT /jobs/:id
 * Full update of a job (any authenticated user)
 */
router.put(
  "/:id",
  authMiddleware(),
  validate(jobSchema),
  JobsController.updateJob
);

/**
 * PATCH /jobs/:id
 * Partial update of a job (any authenticated user)
 */
router.patch(
  "/:id",
  authMiddleware(),
  validate(jobSchema),
  JobsController.patchJob
);

/**
 * -------------------------
 * Admin only routes
 * -------------------------
 */

/**
 * DELETE /jobs/:id
 * Remove a job (admin only)
 */
router.delete(
  "/:id",
  authMiddleware(),
  authorizeRoles("ADMIN"),
  JobsController.deleteJob
);

module.exports = router;
