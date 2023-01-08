const AnswerModel = require("../models/answer.server.model");
const QuestionModel = require("../models/question.server.model");
const UserModel = require("../models/user.server.model");

const AppError = require("../utils/app.error");

// function create answer
exports.createAnswer = async (req, res, next) => {
  const answer = new AnswerModel(req.body);
  try {
    const newAnswer = await answer.save();

    res.status(201).json({
      status: "success",
      data: {
        answer: newAnswer,
      },
    });
  } catch (err) {
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
    const answers = await AnswerModel.find(req.query).sort({ ...objSort });

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
    const answer = await AnswerModel.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found with that id", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        answer,
      },
    });
  } catch (err) {
    next(err);
  }
};

// function update answer by id
exports.updateAnswerById = async (req, res, next) => {
  try {
    const answer = await AnswerModel.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found with that id", 404));
    }
    if (answer.creator != req.user._id) {
      return next(new AppError("Only creator can update answer", 401));
    }
    if (req.body.content) {
      answer.content = req.body.content;
    }
    const updatedAnswer = await answer.save();

    res.status(200).json({
      status: "success",
      data: {
        answer: updatedAnswer,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function delete answer by id
exports.deleteAnswerById = async (req, res, next) => {
  try {
    const answer = await AnswerModel.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found with that id", 404));
    }

    if (answer.creator != req.user._id) {
      return next(new AppError("Only creator can update answer", 401));
    }

    await answer.remove();

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};

// function up vote answer by id
exports.upVoteAnswerById = async (req, res, next) => {
  try {
    const answer = await AnswerModel.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found with that id", 404));
    }

    // TODO: create a middleware for authenticate, hence no need to check in this, waste of query
    // const user = await UserModel.findById(req.user._id);
    // if (user == null) {
    //   return res.status(404).json({ message: "Cannot find user" });
    // }

    const question = await QuestionModel.findById(answer.question);
    if (!question) {
      return next(new AppError("Question not found", 404));
    }

    // TODO: what is this :v
    // if (answer.creator == req.user._id) {
    //   return res
    //     .status(401)
    //     .json({ message: "You are creator of this answer" });
    // }

    if (answer.up_vote_users.includes(req.user._id)) {
      return res
        .status(401)
        .json({ message: "You are already up vote this answer" });
    }

    if (answer.down_vote_users.includes(req.user._id)) {
      answer.down_vote_users = answer.down_vote_users.filter(
        (id) => id != req.user._id
      );
    }
    answer.up_vote_users.push(req.user._id);

    const updatedAnswer = await answer.save();

    res.status(200).json({
      status: "success",
      data: {
        answer: updatedAnswer,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function down vote answer by id
exports.downVoteAnswerById = async (req, res, next) => {
  try {
    const answer = await AnswerModel.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found", 404));
    }

    // TODO: Should use middleware to authen this
    // const user = await UserModel.findById(req.user._id);
    // if (user == null) {
    //   return res.status(404).json({ message: "Cannot find user" });
    // }

    const question = await QuestionModel.findById(answer.question);
    if (!question) {
      return next(new AppError("Question not found", 404));
    }

    // TODO: What is this :v
    // if (answer.creator == req.user._id) {
    //   return res
    //     .status(401)
    //     .json({ message: "You are creator of this answer" });
    // }

    if (answer.down_vote_users.includes(req.user._id)) {
      return res
        .status(401)
        .json({ message: "You are already down vote this answer" });
    }
    if (answer.up_vote_users.includes(req.user._id)) {
      answer.up_vote_users = answer.up_vote_users.filter(
        (id) => id != req.user._id
      );
    }
    answer.down_vote_users.push(req.user._id);

    const updatedAnswer = await answer.save();

    res.status(200).json({
      status: "success",
      data: {
        answer: updatedAnswer,
      },
    });
  } catch (err) {
    return next(err);
  }
};
