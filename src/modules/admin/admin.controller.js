const UsersService = require("../users/users.service");
const JobsService = require("../jobs/jobs.service");

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
};

module.exports = AdminController;
