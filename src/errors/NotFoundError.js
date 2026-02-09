const AppError = require("./AppError");

/**
 * Error for resources not found
 */
class NotFoundError extends AppError {
  constructor(message = "Resource not found", code = "NOT_FOUND") {
    super(message, 404, code);
  }
}

module.exports = NotFoundError;
