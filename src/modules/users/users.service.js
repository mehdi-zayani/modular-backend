const UsersModel = require("./users.model");
const bcrypt = require("bcrypt");

/**
 * Users service: business logic
 */
const UsersService = {
  async createUser(data) {
    // hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return UsersModel.create({ ...data, password: hashedPassword });
  },

  async getUserByEmail(email) {
    return UsersModel.findByEmail(email);
  },

  async getUserById(id) {
    return UsersModel.findById(id);
  },

  async updateLastLogin(id) {
    return UsersModel.updateLastLogin(id);
  },

  async deactivateUser(id) {
    return UsersModel.deactivate(id);
  },

  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
};

module.exports = UsersService;
