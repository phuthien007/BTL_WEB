const mongoose = require("mongoose");

const Answer = require("../models/answer.server.model");
const Question = require("../models/question.server.model");
const UserModel = require("../models/user.server.model");

const AppError = require("../utils/app.error");
const AppResponse = require("../utils/app.response");

// function create answer
exports.createAnswer = async (req, res, next) => {
  console.log(req.body);
  req.body.creator_id = req.user._id;
  req.question_id = req.params.id;
  const answer = new Answer(req.body);
  try {
    const newAnswer = await answer.save();
    return res.status(201).json({
      status: "success",
      data: {
        answer: newAnswer,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// function get all answer
exports.getAllAnswer = async (req, res, next) => {
  try {
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
    const answers = await Answer.find(req.query)
      .sort({ ...objSort })
      .populate([
        {
          path: "creator_id",
          model: UserModel,
        },
        {
          path: "question_id",
          model: Question,
          select: "title",
        },
      ]);

    res.status(200).json({
      status: "success",
      result: answers.length,
      data: {
        answers,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get answer by id
exports.getAnswerById = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found with that id", 404));
    }

    AppResponse.sendResponse(res, 200, { answer });
  } catch (err) {
    next(err);
  }
};

// function update answer by id
exports.updateAnswerById = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return next(new AppError("No answer found with that id", 404));
    }

    if (String(req.user._id) != String(answer.creator_id)) {
      return next(new AppError("Only creator can update answer", 401));
    }

    const updated_answer = await Answer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    AppResponse.sendResponse(res, 200, { answer: updated_answer });
  } catch (err) {
    return next(err);
  }
};

// function delete answer by id
exports.deleteAnswerById = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return next(new AppError("No answer found with that id", 404));
    }

    if (String(req.user._id) != String(answer.creator_id)) {
      return next(new AppError("Only creator can update answer", 401));
    }

    await answer.remove();

    AppResponse.sendResponse(res, 200, null);
  } catch (err) {
    return next(err);
  }
};

// function up vote answer by id
exports.upVoteAnswerById = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found with that id", 404));
    }

    if (answer.up_vote_users.includes(req.user._id)) {
      return next(new AppError('You upvoted this answer', 400));
    }

    if (answer.down_vote_users.includes(req.user._id)) {
      answer.down_vote_users = answer.down_vote_users.filter(
        (id) => String(id) != String(req.user._id)
      );
    }
    answer.up_vote_users.push(req.user._id);

    const updated_answer = await answer.save();

		// increase reputation of current user
		const user = await UserModel.findById(answer.creator_id);
		user.reputation += 5;
		await user.save();

    AppResponse.sendResponse(res, 200, {
      answer: updated_answer,
    });
  } catch (err) {
    return next(err);
  }
};

// function down vote answer by id
exports.downVoteAnswerById = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found", 404));
    }

    if (answer.down_vote_users.includes(req.user._id)) {
      return next(new AppError("You downvoted this answer", 400));
    }
    if (answer.up_vote_users.includes(req.user._id)) {
      answer.up_vote_users = answer.up_vote_users.filter(
        (id) => String(id) != String(req.user._id)
      );

			// decrease reputation of current user
			const user = await UserModel.findById(answer.creator_id);
			user.reputation -= 5;
    }
    answer.down_vote_users.push(req.user._id);

    const updated_answer = await answer.save();

    AppResponse.sendResponse(res, 200, {
      answer: updated_answer,
    });
  } catch (err) {
    return next(err);
  }
};
