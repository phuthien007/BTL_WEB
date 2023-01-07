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
const router = Router();

// setup router

// router get all answer and get from controller
router.get("/", getAllAnswer);

// router create answer and get from controller

router.post("/", createAnswer);

// router get answer by id and get from controller
router.get("/:id", getAnswerById);

// router delete answer by id and get from controller
router.delete("/:id", deleteAnswerById);

// router update answer by id and get from controller
router.patch("/:id", updateAnswerById);

// router up vote answer by id and get from controller
router.patch("/:id/upVote", upVoteAnswerById);

// router down vote answer by id and get from controller
router.patch("/:id/downVote", downVoteAnswerById);

module.exports = router;
