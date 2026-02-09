const UsersModel = require("./users.model");
const bcrypt = require("bcrypt");

/**
 * Users service: business logic for user management
 */
const UsersService = {
  // Create a new user with hashed password
  async createUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return UsersModel.create({ ...data, password: hashedPassword });
  },

  // Retrieve user by email
  async getUserByEmail(email) {
    return UsersModel.findByEmail(email);
  },

  // Retrieve user by ID
  async getUserById(id) {
    return UsersModel.findById(id);
  },

  // Retrieve all users (admin only)
  async getAllUsers() {
    const query = `SELECT id, email, full_name, role, is_active, created_at, updated_at FROM users`;
    const res = await UsersModel.query(query, []); // We will add a query method in model
    return res.rows;
  },

  // Update user fields (PATCH)
  async updateUser(id, data) {
    // Hash password if present
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Build dynamic set clause
    const fields = [];
    const values = [];
    let i = 1;
    for (const key in data) {
      fields.push(`${key} = $${i}`);
      values.push(data[key]);
      i++;
    }
    if (fields.length === 0) return null;

    const query = `UPDATE users SET ${fields.join(", ")}, updated_at = NOW() WHERE id = $${i} RETURNING id, email, full_name, role, is_active, created_at, updated_at`;
    values.push(id);

    const res = await UsersModel.query(query, values);
    return res.rows[0];
  },

  // Soft delete (deactivate user)
  async deactivateUser(id) {
    return UsersModel.deactivate(id);
  },

  // Track last login
  async updateLastLogin(id) {
    return UsersModel.updateLastLogin(id);
  },

  // Validate plain password with hashed password
  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
};

module.exports = UsersService;
