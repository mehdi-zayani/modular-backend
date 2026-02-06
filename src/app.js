const express = require("express");
const cors = require("cors");

const jobsRoutes = require("./modules/jobs/jobs.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jobs", jobsRoutes);

app.get("/", (req, res) => {
  res.send("Modular Backend running");
});

module.exports = app;
