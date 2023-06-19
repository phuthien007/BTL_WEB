const { Router } = require("express");
const {
  getAllBlog,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
  getMyBlog,
} = require("../controller/blog.controller");
const router = Router();

// setup router

// router get all blog and get from controller
router.get("/", getAllBlog);

// router create blog and get from controller
router.post("/", createBlog);

// router get blog by id and get from controller
router.get("/:id", getBlogById);

// router delete blog by id and get from controller
router.delete("/:id", deleteBlogById);

// router update blog by id and get from controller
router.patch("/:id", updateBlogById);

// router get my blog and get from controller
router.get("/myBlog", getMyBlog);

module.exports = router;
