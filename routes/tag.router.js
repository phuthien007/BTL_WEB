const { Router } = require("express");
const {
  getAllTag,
  createTag,
  getTagById,
  deleteTagById,
  updateTagById,
} = require("../controller/tag.controller");
const router = Router();

// setup router

// router get all tag and get from controller
router.get("/", getAllTag);

// router create tag and get from controller
router.post("/", createTag);

// router get tag by id and get from controller
router.get("/:id", getTagById);

// router delete tag by id and get from controller
router.delete("/:id", deleteTagById);

// router update tag by id and get from controller
router.patch("/:id", updateTagById);

module.exports = router;
