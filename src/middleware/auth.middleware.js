const jwt = require("jsonwebtoken");
const config = require("../config/env");

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
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

module.exports = authMiddleware;

