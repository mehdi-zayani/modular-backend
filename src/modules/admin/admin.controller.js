const UsersService = require("../users/users.service");
const JobsService = require("../jobs/jobs.service");
const pool = require("../../db/db");
/**
 * Controller for admin statistics endpoints
 */
const AdminController = {
  /**
   * GET /admin/stats/users
   * Return total users and by role
   */
  getUserStats: async (req, res, next) => {
    try {
      const totalUsers = await UsersService.countUsers();
      const byRole = await UsersService.countUsersByRole();
      res.json({ totalUsers, byRole });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /admin/stats/jobs
   * Return total jobs
   */
  getJobStats: async (req, res, next) => {
    try {
      const totalJobs = await JobsService.countJobs();
      res.json({ totalJobs });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /admin/stats/jobs/type
   * Return jobs count grouped by employment_type
   */
  getJobStatsByType: async (req, res, next) => {
    try {
      const byType = await JobsService.countJobsByEmploymentType();
      res.json(byType);
    } catch (err) {
      next(err);
    }
  },
   // --- Monitoring ---
  getServerUptime: (req, res) => {
    res.json({ uptime: process.uptime() }); // secondes depuis le start du serveur
  },

  getDbHealth: async (req, res, next) => {
    try {
      const result = await pool.query("SELECT 1");
      res.json({ status: "OK", db: result.rows[0] });
    } catch (err) {
      res.status(500).json({ status: "FAILED", error: err.message });
    }
  },

  getRecentLogins: async (req, res, next) => {
    try {
      const logins = await UsersService.getRecentLogins(10);
      res.json(logins);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = AdminController;
