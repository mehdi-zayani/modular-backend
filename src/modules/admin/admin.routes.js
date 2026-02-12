const express = require("express");
const router = express.Router();
const AdminController = require("./admin.controller");
const authMiddleware = require("../../middleware/auth.middleware");

/**
 * -------------------------
 * Admin Stats Endpoints
 * -------------------------
 */
router.get(
  "/stats/users",
  authMiddleware(["ADMIN"]),
  AdminController.getUserStats
);

router.get(
  "/stats/jobs",
  authMiddleware(["ADMIN"]),
  AdminController.getJobStats
);

router.get(
  "/stats/jobs/type",
  authMiddleware(["ADMIN"]),
  AdminController.getJobStatsByType
);

/**
 * -------------------------
 * Monitoring Endpoints
 * -------------------------
 */
router.get(
  "/monitor/uptime",
  authMiddleware(["ADMIN"]),
  AdminController.getServerUptime
);

router.get(
  "/monitor/db",
  authMiddleware(["ADMIN"]),
  AdminController.getDbHealth
);

router.get(
  "/monitor/recent-logins",
  authMiddleware(["ADMIN"]),
  AdminController.getRecentLogins
);

/**
 * -------------------------
 * Request Logs (Audit Trail)
 * -------------------------
 */
router.get(
  "/logs",
  authMiddleware(["ADMIN"]),
  AdminController.getRequestLogs
);

module.exports = router;
