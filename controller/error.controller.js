const AppError = require('../utils/app.error');

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
	sendErrorDev(error, req, res)
};
