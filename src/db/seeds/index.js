const seedUsers = require("./users.seed");
const seedJobs = require("./jobs.seed");

async function run() {
  try {
    console.log("🌱 Starting seed...");

    await seedUsers();
    await seedJobs();

    console.log("✅ Seed completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

run();
