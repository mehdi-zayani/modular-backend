const pool = require("../../db/db");

/**
 * Users model: database queries for users
 */
const UsersModel = {
  async create(user) {
    const { email, password, full_name, role = "USER", is_active = true } = user;
    const query = `
      INSERT INTO users (email, password, full_name, role, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, full_name, role, is_active, created_at, updated_at
    `;
    const values = [email, password, full_name, role, is_active];
    const res = await pool.query(query, values);
    return res.rows[0];
  },

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const res = await pool.query(query, [email]);
    return res.rows[0];
  },

  async findById(id) {
    const query = `SELECT id, email, full_name, role, is_active, created_at, updated_at FROM users WHERE id = $1`;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  },

  async updateLastLogin(id) {
    const query = `UPDATE users SET last_login = NOW(), updated_at = NOW() WHERE id = $1 RETURNING id, email, last_login`;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  },

  async deactivate(id) {
    const query = `UPDATE users SET is_active = FALSE, updated_at = NOW() WHERE id = $1 RETURNING id, is_active`;
    const res = await pool.query(query, [id]);
    return res.rows[0];
  },
  async query(sql, params) {
    return pool.query(sql, params);
  }
};

module.exports = UsersModel;
