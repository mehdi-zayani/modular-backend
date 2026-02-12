const express = require("express");
const router = express.Router();
const HealthController = require("./health.controller");

/**
 * Public endpoint for health check
 */
router.get("/", HealthController.checkHealth);

module.exports = router;
