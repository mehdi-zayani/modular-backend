const express = require("express");
const router = express.Router();
const AuthController = require("./auth.controller");

/**
 * -------------------------
 * Auth Routes
 * -------------------------
 * Public routes for user registration and login
 */

/**
 * POST /auth/register
 * Register a new user
 */
router.post("/register", AuthController.register);

/**
 * POST /auth/login
 * Authenticate a user and return JWT
 */
router.post("/login", AuthController.login);

module.exports = router;
