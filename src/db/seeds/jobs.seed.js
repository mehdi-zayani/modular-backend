const JobsService = require("../../modules/jobs/jobs.service");
const pool = require("../../db/db");
const jobsData = require("./data/jobs-data.json");
/**
 * Seed script for the Jobs module
 */
async function seedJobs() {
  console.log("🌱 Seeding jobs...");

  // Clear existing jobs
  await pool.query("DELETE FROM jobs");

  // Insert jobs using the service layer
  for (const job of jobsData) {
    await JobsService.createJob(job);
  }

  console.log(`✅ Seeded ${jobsData.length} jobs.`);
}

module.exports = seedJobs;
