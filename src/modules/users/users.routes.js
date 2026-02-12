const express = require("express");
const router = express.Router();
const UsersController = require("./users.controller");
const authMiddleware = require("../../middleware/auth.middleware");

/**
 * -------------------------
 * Users Routes
 * -------------------------
 * All routes are protected by JWT and role-based access control.
 * Roles allowed: ADMIN, USER
 */

/**
 * GET /users
 * ADMIN only: list all users
 */
router.get(
  "/",
  authMiddleware(["ADMIN"]),
  UsersController.getAllUsers
);

/**
 * PATCH /users/:id
 * ADMIN can update any user
 * USER can update their own profile only
 */
router.patch(
  "/:id",
  authMiddleware(["ADMIN", "USER"]),
  UsersController.patchUser
);

/**
 * DELETE /users/:id
 * ADMIN can deactivate any user
 * USER can deactivate their own account only
 */
router.delete(
  "/:id",
  authMiddleware(["ADMIN", "USER"]),
  UsersController.deleteUser
);

/**
 * POST /users/:id/role
 * ADMIN only: promote or demote user role
 */
router.post(
  "/:id/role",
  authMiddleware(["ADMIN"]),
  UsersController.changeUserRole
);

module.exports = router;
