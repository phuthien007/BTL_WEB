const {promisify} = require('util');
const jwt = require("jsonwebtoken");

const AppError = require('../utils/app.error');

const User = require("../models/user.server.model");

/**
 * @desc all routes after this need login to access the incoming api
 * if login, the req will contain user (info)
 */
const checkLogin = async (req, res, next) => {
  try {
		// 1) Get token and check
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}
	
		if (!token)
			return next(
				new AppError('You are not logged in yet. Please login to access!', 401)
			);
	
		// 2) Verification token
		const decoded = await promisify(jwt.verify)(token, process.env.JWT_PRIVATE);
	
		// 3) Check if user still exists
		const currentUser = await User.findOne({ _id: decoded.id });
		if (!currentUser)
			return next(
				new AppError('The user belong to the token no longer exist!', 401)
			);
	
		// 4) Check if user changed password after the token was issued
		if (currentUser.changePasswordAfter(decoded.iat)) {
			return next(
				new AppError('User recently changed password! Please log in again.', 401)
			);
		}
	
		// Put user on req
		req.user = currentUser;
	
		// Grant access for routes
		next();
  } catch (err) {
    return next(err);
  }
};

// check has permission by role
const requireAdmin = (req, res, next) => {
  const { roles } = req.user;
  if (roles.includes("admin")) {
    next();
  } else {
    res.status(401).json({ message: "Require admin permission" });
  }
};

module.exports = { checkLogin, requireAdmin };
