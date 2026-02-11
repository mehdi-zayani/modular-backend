const express = require("express");
const router = express.Router();
const AdminController = require("./admin.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Route test simple
router.get("/test", authMiddleware(["ADMIN"]), (req, res) => {
  res.json({ ok: true, user: req.user });
});

// User stats
router.get("/stats/users", authMiddleware(["ADMIN"]), AdminController.getUserStats);

// Jobs stats
router.get("/stats/jobs", authMiddleware(["ADMIN"]), AdminController.getJobStats);

// Jobs by type
router.get("/stats/jobs/type", authMiddleware(["ADMIN"]), AdminController.getJobStatsByType);

module.exports = router;
