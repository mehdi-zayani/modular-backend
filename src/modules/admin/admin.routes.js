const express = require("express");
const router = express.Router();
const AdminController = require("./admin.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// User & job stats 
router.get("/stats/users", authMiddleware(["ADMIN"]), AdminController.getUserStats);
router.get("/stats/jobs", authMiddleware(["ADMIN"]), AdminController.getJobStats);
router.get("/stats/jobs/type", authMiddleware(["ADMIN"]), AdminController.getJobStatsByType);

// --- Monitoring endpoints ---
// Server uptime
router.get("/monitor/uptime", authMiddleware(["ADMIN"]), AdminController.getServerUptime);

// Database health
router.get("/monitor/db", authMiddleware(["ADMIN"]), AdminController.getDbHealth);

// Recent logins
router.get("/monitor/recent-logins", authMiddleware(["ADMIN"]), AdminController.getRecentLogins);

module.exports = router;
