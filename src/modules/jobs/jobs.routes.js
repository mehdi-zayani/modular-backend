const express = require("express");
const JobsController = require("./jobs.controller");

const authenticate = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/authorize.middleware");
const validate = require("../../middleware/validate.middleware");
const { jobSchema } = require("../../validation/job.validation");

const router = express.Router();

/* Public */
router.get("/", JobsController.getJobs);
router.get("/:id", JobsController.getJobById);

/* Authenticated users */
router.post(
  "/",
  authenticate,
  validate(jobSchema),
  JobsController.createJob
);

router.put(
  "/:id",
  authenticate,
  validate(jobSchema),
  JobsController.updateJob
);

router.patch(
  "/:id",
  authenticate,
  validate(jobSchema),
  JobsController.patchJob
);

/* Admin only */
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  JobsController.deleteJob
);

module.exports = router;
