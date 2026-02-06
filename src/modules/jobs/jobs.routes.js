const express = require("express");
const JobsController = require("./jobs.controller");

const router = express.Router();

/**
 * GET /jobs
 */
router.get("/", JobsController.getJobs);

module.exports = router;
