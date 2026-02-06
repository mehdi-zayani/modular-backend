const express = require("express");
const JobsController = require("./jobs.controller");

const router = express.Router();

router.get("/", JobsController.getJobs);
router.post("/", JobsController.createJob);

module.exports = router;
