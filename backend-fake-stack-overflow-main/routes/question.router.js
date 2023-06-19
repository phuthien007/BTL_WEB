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
  getAllAnswersOfQuestionById,
  removeAnswerOfQuestionById,
  reopenQuestionById,
  upvoteAnswerOfQuestionById,
  downvoteAnswerOfQuestionById,
  saveQuestion,
  getQuestionByUser,
  getCountQuestionOfToday,
  getTotalCountQuestion,
  getTotalCountAnswer,
  getCountAnswerOfToday,
  getCountUserOfToday,
  getTotalCountUser,
  getTotalCountQuestionHasAcceptedAnswer,
} = require("../controller/question.controller");
const auth_middlewares = require("../middlewares/index");

const answer_router = require("./answer.router");

const router = Router({ mergeParams: true });

// setup router

// nested routes
// create answer in question
// router.use("/:question_id/answer", answer_router);

router.get("/today", getCountQuestionOfToday);
router.get("/today/answer", getCountAnswerOfToday);
router.get("/today/user", getCountUserOfToday);
router.get("/total", getTotalCountQuestion);
router.get("/total/answer", getTotalCountAnswer);
router.get(
  "/total/answered",

  getTotalCountQuestionHasAcceptedAnswer
);
router.get("/total/user", getTotalCountUser);

// get all question by user
router.get("/user", auth_middlewares.checkLogin, getQuestionByUser);

// CRUD
router.get("/", getAllQuestion);
router.post("/", auth_middlewares.checkLogin, createQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id", auth_middlewares.checkLogin, deleteQuestionById);
router.patch("/:id", auth_middlewares.checkLogin, updateQuestionById);

// up vote question
router.patch("/:id/upVote", auth_middlewares.checkLogin, upVoteQuestionById);
// up vote question
router.patch(
  "/:id/upVote/answer",
  auth_middlewares.checkLogin,
  upvoteAnswerOfQuestionById
);
router.patch(
  "/:id/downVote/answer",
  auth_middlewares.checkLogin,
  downvoteAnswerOfQuestionById
);

// down vote question
router.patch(
  "/:id/downVote",
  auth_middlewares.checkLogin,
  downVoteQuestionById
);

// router accept answer to question by id and get from controller
router.patch(
  "/:id/accept",
  auth_middlewares.checkLogin,
  acceptAnswerToQuestionById
);

// router close question by id and get from controller
router.patch("/:id/close", auth_middlewares.checkLogin, closeQuestionById);

// router reopen question by id and get from controller
router.patch("/:id/reopen", auth_middlewares.checkLogin, reopenQuestionById);

// answer question
router.post(
  "/:id/answer",
  auth_middlewares.checkLogin,
  addAnswerToQuestionById
);

// get all answer in question
router.get(
  "/:id/answer",

  getAllAnswersOfQuestionById
);

router.delete(
  "/:id/answer/:answerId",
  auth_middlewares.checkLogin,
  removeAnswerOfQuestionById
);

router.patch("/:id/save", auth_middlewares.checkLogin, saveQuestion);

module.exports = router;
