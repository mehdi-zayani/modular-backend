const UsersModel = require("./users.model");
const bcrypt = require("bcrypt");
const pool = require("../../db/db");
const ROLES = require("../../constants/roles");

/**
 * UsersService: business logic for user management
 */
const UsersService = {
  /**
   * Create a new user with hashed password
   * @param {Object} data - user data (email, full_name, password, role)
   * @returns {Object} created user
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
  },

  /**
   * Retrieve user by email
   * @param {string} email
   * @returns {Object|null} user
   */
  async getUserByEmail(email) {
    return UsersModel.findByEmail(email);
  },

  /**
   * Retrieve user by ID
   * @param {number} id
   * @returns {Object|null} user
   */
  async getUserById(id) {
    return UsersModel.findById(id);
  },

  /**
   * Retrieve all users (admin only)
   * @returns {Array<Object>} list of users
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
   * Role cannot be modified here (use promote/demote endpoint)
   * @param {number} id
   * @param {Object} data - fields to update
   * @returns {Object|null} updated user
   */
  async updateUser(id, data) {
    // Prevent role change via normal update
    if (data.role) delete data.role;

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
   * Promote or demote user role (ADMIN only)
   * @param {number} id
   * @param {string} newRole - role from ROLES
   * @returns {Object|null} updated user
   */
  async changeUserRole(id, newRole) {
    if (!Object.values(ROLES).includes(newRole)) {
      throw new Error("Invalid role");
    }

    const query = `
      UPDATE users
      SET role = $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING id, email, full_name, role, is_active, created_at, updated_at
    `;
    const res = await UsersModel.query(query, [newRole, id]);
    return res.rows[0];
  },

  /**
   * Soft delete (deactivate user)
   * @param {number} id
   * @returns {Object} deactivated user
   */
  async deactivateUser(id) {
    return UsersModel.deactivate(id);
  },

  /**
   * Track last login timestamp
   * @param {number} id
   */
  async updateLastLogin(id) {
    return UsersModel.updateLastLogin(id);
  },

  /**
   * Validate plain password with hashed password
   * @param {Object} user
   * @param {string} password
   * @returns {boolean}
   */
  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  },

  /**
   * Count total number of users
   * @returns {number}
   */
  async countUsers() {
    const result = await pool.query("SELECT COUNT(*) FROM users");
    return parseInt(result.rows[0].count, 10);
  },

  /**
   * Count number of users grouped by role
   * @returns {Array<{role: string, count: number}>}
   */
  async countUsersByRole() {
    const result = await pool.query(
      "SELECT role, COUNT(*) AS count FROM users GROUP BY role"
    );
    return result.rows;
  },

  /**
   * Get last N user logins
   * @param {number} limit
   * @returns {Array<Object>}
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
