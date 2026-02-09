const express = require("express");
const router = express.Router();
const UsersService = require("./users.service");
const authMiddleware = require("../auth/auth.middleware");
const UsersController = require("./users.controller");

// Only ADMIN can list users
router.get("/", authMiddleware(["ADMIN"]), UsersController.getAllUsers);

// Admin or owner can update
router.patch("/:id", authMiddleware(["ADMIN", "USER"]), UsersController.patchUser);

// Admin or owner can delete
router.delete("/:id", authMiddleware(["ADMIN", "USER"]), UsersController.deleteUser);

module.exports = router;
