const AppError = require("./AppError");

/**
 * Error for invalid client requests
 */
class BadRequestError extends AppError {
  constructor(message = "Bad request", code = "BAD_REQUEST") {
    super(message, 400, code);
  }
}

module.exports = BadRequestError;
