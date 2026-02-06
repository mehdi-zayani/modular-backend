const express = require("express");
const JobsController = require("./jobs.controller");

const router = express.Router();

router.get("/", JobsController.getJobs);           // list jobs with pagination
router.get("/:id", JobsController.getJobById);    // get job by id
router.post("/", JobsController.createJob);       // create job
router.put("/:id", JobsController.updateJob);     // update job fully
router.delete("/:id", JobsController.deleteJob);  // delete job
router.patch("/:id", JobsController.patchJob);    // update job partially

module.exports = router;
