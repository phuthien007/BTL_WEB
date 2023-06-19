const { Router } = require("express");
const {
  getAllTag,
  createTag,
  getTagById,
  deleteTagById,
  updateTagById,
} = require("../controller/tag.controller");
const { checkLogin } = require("../middlewares");
const router = Router();

// setup router

// router get all tag and get from controller
router.get("/", getAllTag);

// router create tag and get from controller
router.post("/", checkLogin, createTag);

// router get tag by id and get from controller
router.get("/:id", getTagById);

// router delete tag by id and get from controller
router.delete("/:id", checkLogin, deleteTagById);

// router update tag by id and get from controller
router.patch("/:id", checkLogin, updateTagById);

module.exports = router;
