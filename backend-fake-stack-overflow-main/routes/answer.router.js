const { Router } = require("express");

const {
  getAllAnswer,
  getAnswerById,
  createAnswer,
  updateAnswerById,
  deleteAnswerById,
  upVoteAnswerById,
  downVoteAnswerById,
} = require("../controller/answer.controller");
const answer_controller = require("../controller/answer.controller");
const auth_middlewares = require("../middlewares/index");

const router = Router({ mergeParams: true });

// setup router

// simple CRUD
router.get("/", getAllAnswer);
router.post("/", auth_middlewares.checkLogin, createAnswer);
router.get("/:id", getAnswerById);
router.delete("/:id", auth_middlewares.checkLogin, deleteAnswerById);
router.patch("/:id", auth_middlewares.checkLogin, updateAnswerById);

// upvote answer
router.patch("/:id/upVote", auth_middlewares.checkLogin, upVoteAnswerById);

// downvote answer
router.patch("/:id/downVote", auth_middlewares.checkLogin, downVoteAnswerById);

module.exports = router;
