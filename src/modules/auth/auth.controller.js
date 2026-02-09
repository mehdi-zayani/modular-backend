const UsersService = require("../users/users.service");
const jwt = require("jsonwebtoken");
const config = require("../../config/env");

/**
 * Auth controller
 */
const AuthController = {
  // POST /auth/register
  register: async (req, res, next) => {
    try {
      const { email, password, full_name, role } = req.body;
      const userExists = await UsersService.getUserByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const user = await UsersService.createUser({ email, password, full_name, role });
      res.status(201).json({ id: user.id, email: user.email, full_name: user.full_name, role: user.role });
    } catch (err) {
      next(err);
    }
  },

  // POST /auth/login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UsersService.getUserByEmail(email);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const valid = await UsersService.validatePassword(user, password);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        config.jwtSecret,
        { expiresIn: "8h" }
      );

      await UsersService.updateLastLogin(user.id);

      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = AuthController;
