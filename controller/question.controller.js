const QuestionModel = require("../models/question.server.model");
const TagModel = require("../models/tag.server.model");
const GroupModel = require("../models/group.server.model");
const UserModel = require("../models/user.server.model");
const AnswerModel = require("../models/answer.server.model");

const AppError = require('../utils/app.error');

// function create question
exports.createQuestion = async (req, res, next) => {
  req.body.creator = req.user._id;
  const question = new QuestionModel(req.body);
  try {
    const newQuestion = await question.save();

    res.status(201).json({
			status: 'success',
			data: {
				question: newQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function get all question
exports.getAllQuestion = async (req, res, next) => {
  try {
    const questions = await QuestionModel.find();

    res.status(200).json({
			status: 'success',
			result: questions.length,
			data: {
				questions
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function get question by id
exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (!question) {
      return next(new AppError('Question not found', 404));
    }

    res.status(200).json({
			status: 'success',
			data: {
				question
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function update question by id
exports.updateQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }
    if (question.creator != req.user._id) {
			return next(new AppError('You are not creator of this question', 401));
    }
    if (req.body.title != null) {
      question.title = req.body.title;
    }
    if (req.body.content != null) {
      question.content = req.body.content;
    }
    if (req.body.tags != null) {
      question.tags = req.body.tags;
    }
    if (req.body.group != null) {
      question.group = req.body.group;
    }
    const updatedQuestion = await question.save();

    res.status(200).json({
			status: 'success',
			data: {
				question: updatedQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function delete question by id
exports.deleteQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }
    if (question.creator != req.user._id) {
      return next(new AppError('Only creator can delete question', 401));
    }

    await question.remove();

    res.status(200).json({
			status: 'success',
			data: null
		});
  } catch (err) {
    return next(err);
  }
};

// function get question by tag
exports.getQuestionByTag = async (req, res, next) => {
  try {
    const tag = await TagModel.findById(req.params.id);
    if (tag == null) {
      return next(new AppError('Tag not found', 404));
    }
    const questions = await QuestionModel.find({ tags: tag.name });

    res.status(200).json({
			status: 'success',
			result: questions.length,
			data: {
				questions
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function get question by group
exports.getQuestionByGroup = async (req, res, next) => {
  try {
    const group = await GroupModel.findById(req.params.id);
    if (group == null) {
      return next(new AppError('Group not found', 404));
    }
    const questions = await QuestionModel.find({ group: group._id });

    res.status(200).json({
			status: 'success',
			result: questions.length,
			data: {
				questions
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function get question by user
exports.getQuestionByUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user == null) {
      return next(new AppError('User not found', 404));
    }
    const questions = await QuestionModel.find({ creator: user._id });

    res.status(200).json({
			status: 'success',
			result: questions.length,
			data: {
				questions
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function get question by search
exports.getQuestionBySearch = async (req, res, next) => {
  try {
    const questions = await QuestionModel.find({
      $text: { $search: req.params.search },
    });

    res.status(200).json({
			status: 'success',
			result: questions.length,
			data: {
				questions
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function close question by id
exports.closeQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }
    if (question.creator != req.user._id) {
      return next(new AppError('You are not creator of this question', 401));
    }
    question.status = "closed";
    const updatedQuestion = await question.save();

    res.status(200).json({
			status: 'success',
			data: {
				question: updatedQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function accept answer of question by id
exports.acceptAnswerToQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }

    if (question.creator != req.user._id) {
			return next(new AppError('You are not creator of this question', 401));
    }

    question.acceptedAnswer = req.body.answerId;
    const updatedQuestion = await question.save();

    res.status(200).json({
			status: 'success',
			data: {
				question: updatedQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function add answer to question by id
exports.addAnswerToQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }

    const answer = new AnswerModel({
      content: req.body.content,
      creator: req.user._id,
      question: question._id,
    });

    const newAnswer = await answer.save();
    question.answers.push(newAnswer._id);
    const updatedQuestion = await question.save();

    res.status(200).json({
			status: 'success',
			data: {
				question: updatedQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function upvote question by id
exports.upVoteQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }

    if (question.upvotes.includes(req.user._id)) {
      return next(new AppError('You have upvoted this question', 400));
    }

    if (question.downvotes.includes(req.user._id)) {
      question.downvotes = question.downvotes.filter(
        (id) => id != req.user._id
      );
    }

    question.upvotes.push(req.user._id);
    const updatedQuestion = await question.save();

    res.status(200).json({
			status: 'success',
			data: {
				question: updatedQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function downvote question by id
exports.downVoteQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }

    if (question.downvotes.includes(req.user._id)) {
      return next(new AppError('You have downvoted this question', 400));
    }

    if (question.upvotes.includes(req.user._id)) {
      question.upvotes = question.upvotes.filter((id) => id != req.user._id);
    }

    question.downvotes.push(req.user._id);
    const updatedQuestion = await question.save();

    res.status(200).json({
			status: 'success',
			data: {
				question: updatedQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function upvote answer of question by id
exports.upvoteAnswerOfQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }

    const answer = question.answers.find(
      (answer) => answer._id == req.body.answerId
    );
    if (answer == null) {
      return next(new AppError('Answer not found', 404));
    }

    if (answer.upvotes.includes(req.user._id)) {
      return next(new AppError('You have upvoted this question', 400));
    }
    if (answer.downvotes.includes(req.user._id)) {
      answer.downvotes = answer.downvotes.filter((id) => id != req.user._id);
    }

    answer.upvotes.push(req.user._id);
    const updatedQuestion = await question.save();

    res.status(200).json({
			status: 'success',
			data: {
				question: updatedQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function downvote answer of question by id
exports.downvoteAnswerOfQuestionById = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question == null) {
      return next(new AppError('Question not found', 404));
    }

    const answer = question.answers.find(
      (answer) => answer._id == req.body.answerId
    );

    if (answer == null) {
      return next(new AppError('Answer not found', 404));
    }

    if (answer.downvotes.includes(req.user._id)) {
      return next(new AppError('You have downvoted this question', 400));
    }
    if (answer.upvotes.includes(req.user._id)) {
      answer.upvotes = answer.upvotes.filter((id) => id != req.user._id);
    }

    answer.downvotes.push(req.user._id);
    const updatedQuestion = await question.save();

    res.status(200).json({
			status: 'success',
			data: {
				question: updatedQuestion
			}
		});
  } catch (err) {
    return next(err);
  }
};
