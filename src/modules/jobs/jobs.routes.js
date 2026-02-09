const express = require("express");
const router = express.Router();
const JobsController = require("./jobs.controller");
const authMiddleware = require("../auth/auth.middleware");

/**
 * Jobs routes
 * Public routes for reading jobs
 */
router.get("/", JobsController.getJobs);          // public
router.get("/:id", JobsController.getJobById);    // public

/**
 * Protected routes
 * Only authenticated users or admin can modify jobs
 */
router.post("/", authMiddleware(["USER", "ADMIN"]), JobsController.createJob);
router.patch("/:id", authMiddleware(["USER", "ADMIN"]), JobsController.patchJob);
router.delete("/:id", authMiddleware(["ADMIN"]), JobsController.deleteJob);

module.exports = router;
