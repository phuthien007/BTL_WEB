const { Router } = require("express");
const {
  getAllComment,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  getAllCommentOfAnswer,
  getAllCommentOfBlog,
  commentAnswer,
  commentBlog,
} = require("../controller/comment.controller");

const router = Router();

// setup router

// router get all comment and get from controller
router.get("/", getAllComment);

// router create comment and get from controller
router.post("/", createComment);

// router get comment by id and get from controller
router.get("/:id", getCommentById);

// router delete comment by id and get from controller
router.delete("/:id", deleteCommentById);

// router update comment by id and get from controller
router.patch("/:id", updateCommentById);

// router get all comment of answer and get from controller
router.get("/answer/:id", getAllCommentOfAnswer);

// router get all comment of blog and get from controller
router.get("/blog/:id", getAllCommentOfBlog);

// router comment answer and get from controller
router.post("/answer/:id", commentAnswer);

// router comment blog and get from controller
router.post("/blog/:id", commentBlog);

module.exports = router;
