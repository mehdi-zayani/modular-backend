const UsersService = require("../users/users.service");
const JobsService = require("../jobs/jobs.service");

/**
 * Admin Controller
 * Provides statistics endpoints for admin users
 */
const AdminController = {
  // GET /admin/stats/users
  usersStats: async (req, res, next) => {
    try {
      const totalUsers = await UsersService.countUsers();
      const rolesCount = await UsersService.countUsersByRole();
      res.json({ totalUsers, rolesCount });
    } catch (err) {
      next(err);
    }
  },

  // GET /admin/stats/jobs
  jobsStats: async (req, res, next) => {
    try {
      const totalJobs = await JobsService.countJobs();
      const jobsByType = await JobsService.countJobsByEmploymentType();
      res.json({ totalJobs, jobsByType });
    } catch (err) {
      next(err);
    }
  },

  // GET /admin/stats/logins
  recentLogins: async (req, res, next) => {
    try {
      const lastLogins = await UsersService.getRecentLogins(10); // last 10 logins
      res.json({ lastLogins });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AdminController;
