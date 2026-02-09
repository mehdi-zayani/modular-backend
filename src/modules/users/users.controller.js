const UsersService = require("./users.service");

/**
 * Controller for user management
 * Supports admin + owner checks
 */
const UsersController = {
  // GET /users
  getAllUsers: async (req, res, next) => {
    try {
      const query = `SELECT id, email, full_name, role, is_active, created_at, updated_at FROM users`;
      const users = await UsersService.getAllUsers(query);
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  // PATCH /users/:id
  patchUser: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const requester = req.user;

      // owner or admin check
      if (requester.role !== "ADMIN" && requester.id !== userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const updatedUser = await UsersService.updateUser(userId, req.body);
      if (!updatedUser) return res.status(404).json({ error: "User not found" });

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /users/:id
  deleteUser: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const requester = req.user;

      // owner or admin check
      if (requester.role !== "ADMIN" && requester.id !== userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const deletedUser = await UsersService.deactivateUser(userId);
      if (!deletedUser) return res.status(404).json({ error: "User not found" });

      res.json({ message: "User deactivated successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UsersController;
