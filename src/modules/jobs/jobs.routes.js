const express = require("express");
const JobsController = require("./jobs.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/authorize.middleware");
const validate = require("../../middleware/validate.middleware");
const { jobSchema } = require("../../validation/job.validation");

const router = express.Router();

/**
 * -------------------------
 * Public routes (no auth required)
 * -------------------------
 */
router.get("/", JobsController.getJobs);
router.get("/:id", JobsController.getJobById);

/**
 * -------------------------
 * Authenticated users routes
 * -------------------------
 */
router.post(
  "/",
  authMiddleware(), // any authenticated user
  validate(jobSchema),
  JobsController.createJob
);

router.put(
  "/:id",
  authMiddleware(), // any authenticated user
  validate(jobSchema),
  JobsController.updateJob
);

router.patch(
  "/:id",
  authMiddleware(), // any authenticated user
  validate(jobSchema),
  JobsController.patchJob
);

/**
 * -------------------------
 * Admin only routes
 * -------------------------
 */
router.delete(
  "/:id",
  authMiddleware(), 
  authorizeRoles("ADMIN"), // only admins
  JobsController.deleteJob
);

module.exports = router;
