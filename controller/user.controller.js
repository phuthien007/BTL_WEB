const User = require("../models/user.server.model");
const AppError = require("../utils/app.error");
const AppResponse = require("../utils/app.response");

exports.register = async (req, res, next) => {
  try {
    const new_user = await User.create(req.body);

    AppResponse.sendResponse(res, 201, {
      user: new_user,
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
    // const optional = {};
    //   optional.sort = sortBy;
    //   delete req.query.sort;
    // }
    let objSort;
    if (req.query.sort) {
      const sortBy =
        req.query.sort instanceof Array ? req.query.sort : [req.query.sort];
      delete req.query.sort;
      // convert to object
      objSort = sortBy.reduce((acc, cur) => {
        const [key, value] = cur.split(",");
        acc[key] = value;
        return acc;
      }, {});
      console.log(objSort);
    }

    const users = await User.find(req.query)
      .sort({ ...objSort })
      .select("-password");
    console.log(req.query.sort);
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
    const user = await User.findById(req.user._id).select("-password");

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
