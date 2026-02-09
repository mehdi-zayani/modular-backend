const express = require("express");
const router = express.Router();
const JobsController = require("./jobs.controller");
const authMiddleware = require("../auth/auth.middleware");

// Public routes
router.get("/", JobsController.getJobs);
router.get("/:id", JobsController.getJobById);

// Protected routes
router.post("/", authMiddleware(["USER", "ADMIN"]), JobsController.createJob);
router.patch("/:id", authMiddleware(["USER", "ADMIN"]), JobsController.patchJob);
router.delete("/:id", authMiddleware(["ADMIN"]), JobsController.deleteJob);

module.exports = router;
