const UsersService = require("../../modules/users/users.service");
const pool = require("../../db/db");

/**
 * Seed script for Users module
 * Populates the users table with realistic test users.
 * Uses the UsersService to ensure business logic, password hashing, and validations.
 * 
 * Best practices:
 * - Deletes existing users to avoid duplicates on multiple runs.
 * - Creates admin and normal users for sandbox/demo usage.
 * - Data is realistic but safe for testing.
 */
async function seedUsers() {
  console.log("🌱 Starting Users seeding...");

  // Remove existing users (optional: keep production users separate)
  await pool.query("DELETE FROM users");

  // Define users
  const users = [
    {
      full_name: "Admin User",
      email: "admin@example.com",
      password: "Admin123!", // Service should hash
      role: "ADMIN",
      is_active: true
    },
    {
      full_name: "John Doe",
      email: "john.doe@example.com",
      password: "User123!",
      role: "USER",
      is_active: true
    },
    {
      full_name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "User123!",
      role: "USER",
      is_active: true
    },
    {
      full_name: "Richard Newton",
      email: "richard.newton@example.com",
      password: "User123!",
      role: "SYSTEM",
      is_active: true
    },
    {
      full_name: "Sara Benali",
      email: "sara.benali@example.com",
      password: "User123!",
      role: "USER",
      is_active: true
    }
  ];

  // Insert users via service layer
  for (const user of users) {
    await UsersService.createUser(user);
  }

  console.log(`✅ Successfully seeded ${users.length} users.`);
}

module.exports = seedUsers;
