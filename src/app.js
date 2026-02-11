const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const jobsRoutes = require("./modules/jobs/jobs.routes");
const { NotFoundError } = require("./errors");
const authRoutes = require("./modules/auth/auth.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const requestLogger = require("./middleware/requestLogger.middleware");
const loggingMiddleware = require("./middleware/logging.middleware");
const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(loggingMiddleware);
// Auth routes
app.use("/auth", authRoutes);

console.log(adminRoutes.stack); 
// Admin routes
app.use("/admin", adminRoutes);

// Jobs routes
app.use("/jobs", jobsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Modular Backend running");
});

// 404 handler (doit être en dernier)
app.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

// Error handler
app.use(errorHandler);
module.exports = app;
