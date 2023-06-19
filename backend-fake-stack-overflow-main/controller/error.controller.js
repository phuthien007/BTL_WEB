const AppError = require('../utils/app.error');

/* TOKEN */
// invalid token
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

// Toke expires
const handleJWTExpiredError = () =>
  new AppError('Your token is expired! Please log in again.', 401);

// HANDLE CAST_ERROR: Invalid Id
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// HANDLE DUPLICATE FIELDS ERROR: (code: 11000)
const handleDuplicateFieldsDB = (err) => {
  const values = Object.values(err.keyValue).join(', ');
  const message = `Duplicate field value: ${values}. Please try another value!`;

  return new AppError(message, 400);
};

// HANDLE VALIDATION ERROR
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

/**
 * @desc send error to client in development mode
 * 
 * @param {AppError} err 
 * @param {Request} req 
 * @param {Response} res 
 */
const sendErrorDev = (err, req, res) => {

	// Operational, trusted errors: send message to client
	if (err.isOperational){
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			errorName: err.name,
			message: err.message,
			stack: err.stack
		})
	}

	// Programming or other unknown error: log and send generic message
	console.log('ERROR 💥', err);
	console.log('😔 ERROR NAME: ', err.name);
	res.status(500).json({
		status: 'error',
		message: 'Something went wrong'
	})
};

/**
 * @desc send error to client in production mode
 * 
 * @param {AppError} err 
 * @param {Request} req 
 * @param {Response} res 
 */
const sendErrorProd = (err, req, res) => {
	// NOTE: do later
}

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

	let error = {... err};
	error.name = err.name;
	error.message = err.message;

	// first, we will only send in development mode
	// then, maybe we will send in production mode
	if (error.name === 'CastError') error = handleCastErrorDB(error);
	if (error.code === 11000) error = handleDuplicateFieldsDB(error);
	if (error.name === 'ValidationError')
		error = handleValidationErrorDB(error);
	if (error.name === 'JsonWebTokenError') error = handleJWTError();
	if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
	
	sendErrorDev(error, req, res)
};
