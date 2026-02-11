const express = require("express");
const router = express.Router();

const AdminController = require("./admin.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorizeRoles = require("../../middleware/authorize.middleware");

/* Admin-only stats routes */
router.get(
  "/stats/users",
  authenticate,
  authorizeRoles("ADMIN"),
  AdminController.usersStats
);

router.get(
  "/stats/jobs",
  authenticate,
  authorizeRoles("ADMIN"),
  AdminController.jobsStats
);

router.get(
  "/stats/logins",
  authenticate,
  authorizeRoles("ADMIN"),
  AdminController.recentLogins
);

module.exports = router;
