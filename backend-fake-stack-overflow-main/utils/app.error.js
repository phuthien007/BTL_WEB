/**
 * @brief replace Error, we can pass error message and error status to error
 */
class AppError extends Error {

	/**
	 * 
	 * @param {String} message - error message
	 * @param {Int} statusCode - error status code
	 */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;