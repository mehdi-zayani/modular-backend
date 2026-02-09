const express = require("express");
const router = express.Router();
const UsersController = require("./users.controller");
const authMiddleware = require("../auth/auth.middleware");

/**
 * Users routes
 * Protected by JWT and role-based access control
 */

// ADMIN only: list all users
router.get("/", authMiddleware(["ADMIN"]), UsersController.getAllUsers);

// ADMIN or owner: update user
router.patch("/:id", authMiddleware(["ADMIN", "USER"]), UsersController.patchUser);

// ADMIN or owner: deactivate/delete user
router.delete("/:id", authMiddleware(["ADMIN", "USER"]), UsersController.deleteUser);

module.exports = router;
