const { Router } = require("express");
const {
  getAllQuestion,
  getQuestionById,
  createQuestion,
  updateQuestionById,
  deleteQuestionById,
  addAnswerToQuestionById,
  upVoteQuestionById,
  downVoteQuestionById,
  acceptAnswerToQuestionById,
  closeQuestionById,
} = require("../controller/question.controller");
const router = Router();

// setup router

// router get all question and get from controller
router.get("/", getAllQuestion);

// router create question and get from controller
router.post("/", createQuestion);

// router get question by id and get from controller

router.get("/:id", getQuestionById);

// router delete question by id and get from controller
router.delete("/:id", deleteQuestionById);

// router update question by id and get from controller
router.patch("/:id", updateQuestionById);

// router add answer to question by id and get from controller
router.patch("/:id/add", addAnswerToQuestionById);

// router remove answer from question by id and get from controller

// router up vote question by id and get from controller
router.patch("/:id/upVote", upVoteQuestionById);

// router down vote question by id and get from controller
router.patch("/:id/downVote", downVoteQuestionById);

// router accept answer to question by id and get from controller
router.patch("/:id/accept", acceptAnswerToQuestionById);

// router close question by id and get from controller
router.patch("/:id/close", closeQuestionById);

module.exports = router;
