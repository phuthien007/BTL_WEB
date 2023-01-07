const UserModel = require("../models/user.server.model");
const AppError = require("../utils/app.error");

exports.login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user == null) {
      return next(new AppError("User not found", 404));
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      if (isMatch) {
        return res.status(200).json({
          status: "success",
          message: "Login successfully",
          accessToken: user.generateAuthToken(),
        });
      }
      return res
        .status(400)
        .json({ status: "fail", message: "Wrong password" });
    });
  } catch (err) {
    return next(err);
  }
};

exports.register = async (req, res, next) => {
  const user = new UserModel(req.body);
  try {
    const newUser = await user.save();

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  if (req.body.roles != null) {
    // move to lowercase
    req.body.roles = req.body.roles.map((role) => role.toLowerCase());

    res.user.roles = req.body.roles;
  }

  try {
    const updatedUser = await res.user.save();

    res.json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await UserModel.find().select("-password");

    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getUserById = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

exports.loadCurrentUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await res.user.remove();

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};
