const UsersService = require("./users.service");
const ROLES = require("../../constants/roles");

/**
 * UsersController: handles HTTP requests for user management
 * Supports admin and owner checks
 */
const UsersController = {
  /**
   * GET /users
   * List all users (admin only)
   */
  getAllUsers: async (req, res, next) => {
    try {
      const users = await UsersService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  /**
   * PATCH /users/:id
   * Update user fields (admin or owner)
   */
  patchUser: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const requester = req.user;

      // Admin or owner check
      if (requester.role !== ROLES.ADMIN && requester.id !== userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const updatedUser = await UsersService.updateUser(userId, req.body);
      if (!updatedUser) return res.status(404).json({ error: "User not found" });

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /users/:id
   * Soft delete (deactivate user), admin or owner
   */
  deleteUser: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const requester = req.user;

      // Admin or owner check
      if (requester.role !== ROLES.ADMIN && requester.id !== userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const deactivatedUser = await UsersService.deactivateUser(userId);
      if (!deactivatedUser) return res.status(404).json({ error: "User not found" });

      res.json({ message: "User deactivated successfully" });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /users/:id/role
   * Promote or demote user role (admin only)
   */
  changeUserRole: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const { role } = req.body;
      const requester = req.user;

      if (requester.role !== ROLES.ADMIN) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const updatedUser = await UsersService.changeUserRole(userId, role);
      if (!updatedUser) return res.status(404).json({ error: "User not found" });

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UsersController;
