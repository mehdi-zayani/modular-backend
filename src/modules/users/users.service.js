const UsersModel = require("./users.model");
const bcrypt = require("bcrypt");
const pool = require("../../db/db");
const ROLES = require("../../constants/roles");

/**
 * Users service: business logic for user management
 */
const UsersService = {
  /**
   * Create a new user with hashed password
   */
  async createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const role = Object.values(ROLES).includes(data.role)
    ? data.role
    : ROLES.USER;

  return UsersModel.create({
    ...data,
    role,
    password: hashedPassword,
  });
}
,

  /**
   * Retrieve user by email
   */
  async getUserByEmail(email) {
    return UsersModel.findByEmail(email);
  },

  /**
   * Retrieve user by ID
   */
  async getUserById(id) {
    return UsersModel.findById(id);
  },

  /**
   * Retrieve all users (admin only)
   */
  async getAllUsers() {
    const query = `
      SELECT id, email, full_name, role, is_active, created_at, updated_at 
      FROM users
    `;
    const res = await UsersModel.query(query, []);
    return res.rows;
  },

  /**
   * Update user fields (PATCH)
   */
  /**
   * Update user fields (PATCH)
   * Role cannot be modified here (admin endpoint required)
   */
  async updateUser(id, data) {
    // Prevent role change via normal update
    if (data.role) {
      delete data.role;
    }

    // Hash password if present
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Build dynamic SET clause
    const fields = [];
    const values = [];
    let i = 1;

    for (const key in data) {
      fields.push(`${key} = $${i}`);
      values.push(data[key]);
      i++;
    }

    // Nothing to update
    if (fields.length === 0) return null;

    const query = `
      UPDATE users
      SET ${fields.join(", ")},
          updated_at = NOW()
      WHERE id = $${i}
      RETURNING id, email, full_name, role, is_active, created_at, updated_at
    `;

    values.push(id);

    const res = await UsersModel.query(query, values);
    return res.rows[0];
  },


  /**
   * Soft delete (deactivate user)
   */
  async deactivateUser(id) {
    return UsersModel.deactivate(id);
  },

  /**
   * Track last login timestamp
   */
  async updateLastLogin(id) {
    return UsersModel.updateLastLogin(id);
  },

  /**
   * Validate plain password with hashed password
   */
  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  },

  /**
   * Count total number of users
   */
  async countUsers() {
    const result = await pool.query("SELECT COUNT(*) FROM users");
    return parseInt(result.rows[0].count, 10);
  },

  /**
   * Count number of users grouped by role
   */
  async countUsersByRole() {
    const result = await pool.query(
      "SELECT role, COUNT(*) AS count FROM users GROUP BY role"
    );
    return result.rows; // [{role: 'ADMIN', count: 2}, {role: 'USER', count: 10}, ...]
  },

  /**
   * Get last N user logins
   */
  async getRecentLogins(limit = 10) {
    const result = await pool.query(
      "SELECT id, email, full_name, last_login FROM users ORDER BY last_login DESC NULLS LAST LIMIT $1",
      [limit]
    );
    return result.rows;
  },
};

module.exports = UsersService;
