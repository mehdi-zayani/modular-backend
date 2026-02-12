const jwt = require("jsonwebtoken");
const config = require("../config/env");
const ROLES = require("../constants/roles");

/**
 * Middleware to protect routes with JWT
 * @param {Array} roles - Optional array of roles allowed
 */
function authMiddleware(roles = []) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, config.jwt.secret);

      req.user = decoded;

      // Role check
      if (roles.length && (!decoded.role || !roles.includes(decoded.role))) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        error: "Invalid or expired token",
      });
    }
  };
}

module.exports = authMiddleware;
