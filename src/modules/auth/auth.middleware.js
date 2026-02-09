const jwt = require("jsonwebtoken");
const config = require("../../config/env");

/**
 * Middleware to protect routes with JWT
 */
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ error: "Unauthorized" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;

      // role check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
};

module.exports = authMiddleware;
