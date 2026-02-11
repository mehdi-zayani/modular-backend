const jwt = require("jsonwebtoken");
const config = require("../config/env");

/**
 * Verify JWT and attach user to request
 */
function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authentication required",
        code: "AUTH_REQUIRED",
      });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt.secret);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid or expired token",
      code: "INVALID_TOKEN",
    });
  }
}

module.exports = authenticate;
