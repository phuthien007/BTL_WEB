// router user
const express = require("express");
const {
  login,
  register,
  deleteUser,
  updateUser,
  loadCurrentUser,
  getAllUser,
  getUserById,
} = require("../controller/user.controller");
const { checkLogin } = require("../middlewares");
const UserModel = require("../models/user.server.model");

const router = express.Router();

// login
router.post("/login", login);

// setup endpoint get all user
router.get("/", checkLogin, getAllUser);

// load current user
router.get("/me", checkLogin, loadCurrentUser);

router
  .get("/:id", checkLogin, getUser, getUserById)
  .patch("/:id", checkLogin, getUser, updateUser)
  .delete("/:id", checkLogin, getUser, deleteUser);

// setup endpoint create user
router.post("/signup", register);

// middleware get user by id
async function getUser(req, res, next) {
  let user;
  try {
    user = await UserModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
