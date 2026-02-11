const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const jobsRoutes = require("./modules/jobs/jobs.routes");
const { NotFoundError } = require("./errors");
const authRoutes = require("./modules/auth/auth.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/admin", adminRoutes);

app.use("/jobs", jobsRoutes);

app.get("/", (req, res) => {
  res.send("Modular Backend running");
});


app.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});
app.use(errorHandler);
module.exports = app;
