const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Email = require("../services/email");
const AppError = require("../utils/app.error");
const AppResponse = require("../utils/app.response");

const User = require("../models/user.server.model");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PRIVATE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// create send TOKEN with COOKIE
const createSendToken = (user, status_code, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // sending jwt via cookie
  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(status_code).json({
    status: "success",
    data: {
      user,
    },
    accessToken: token,
  });
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1) check if username and password exist
    if (!username || !password)
      return next(new AppError("Please provide username and password", 400));

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password, user.password)))
      return next(new AppError("Incorrect username or password", 400));

    // 3) Check if user is blocked or not
    if (!user.status === "active")
      return next(new AppError("Your account is deactivated", 401));

    // 3) Send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    return next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is no user with email address.", 404));
    }

    // 2) Generate the random reset token
    const reset_token = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      // 3) Send it to user's email
      // User access to this URL to change password
			const fe_host = process.env.FE_HOST || 'localhost';
			const fe_port = process.env.FE_PORT || 5000;
      const reset_URL = `${fe_host}:${fe_port}/auth/reset-password/${reset_token}`;

      new Email(user, reset_URL).sendPasswordReset();

      AppResponse.sendResponse(res, 200, "Token sent to your email");
    } catch (err) {
      user.password_reset_token = undefined;
      user.password_reset_expires = undefined;
      await user.save({ validateBeforeSave: false });

      console.log(err);

      return next(
        new AppError("There was an error sending email. Try again later!", 500)
      );
    }
  } catch (err) {
    next(err);
  }
};

// reset password
exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on Token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      password_reset_token: hashedToken,
      password_reset_expires: { $gt: Date.now() },
    });

    // 2) Check if user exists
    if (!user)
      return next(new AppError("Token is invalid or has expired!", 400));

    // 3) Set new password and passwordConfirm
    user.password = req.body.password;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();

    // 4) Update passwordChangedAt using pre middleware
    // 5) Log user in, send JWT
    createSendToken(user, 200, res);
  } catch (err) {
    return next(err);
  }
};
