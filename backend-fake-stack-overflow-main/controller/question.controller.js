const Question = require("../models/question.server.model");
const TagModel = require("../models/tag.server.model");
const GroupModel = require("../models/group.server.model");
const UserModel = require("../models/user.server.model");
const AnswerModel = require("../models/answer.server.model");

const AppError = require("../utils/app.error");
const QuestionModel = require("../models/question.server.model");

// function create question
exports.createQuestion = async (req, res, next) => {
  req.body.creator = req.user._id;

  // create tag if not have id in req.body.tags
  const tags = req.body.tags;
  const tagsId = [];
  if (tags) {
    for (let i = 0; i < tags.length; i++) {
      console.log(tags[i]);
      if (tags[i]._id) {
        tagsId.push(tags[i]._id);
      } else {
        // check name tag exist
        console.log("check tag exist");
        console.log(tags[i].name);
        const tagExist = await TagModel.findOne({ name: tags[i].name.trim() });
        if (tagExist) {
          tagsId.push(tagExist._id);
          console.log(tagExist);
          console.log("tag exist");
          continue;
        }
        const tag = new TagModel(tags[i]);
        console.log("createTag");
        try {
          const newTag = await tag.save();
          console.log(newTag);
          console.log("createTag success");
          tagsId.push(newTag._id);
        } catch (err) {
          return next(err);
        }
      }
    }
    req.body.tags = tagsId;
  }

  const question = new Question(req.body);
  try {
    const newQuestion = await question.save();

    // increase reputation of current user
    const current_user = await UserModel.findById(req.user._id);
    current_user.reputation += 2;
    req.user = await current_user.save();

    res.status(201).json({
      status: "success",
      data: {
        question: newQuestion,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get all question
exports.getAllQuestion = async (req, res, next) => {
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
    } else {
			objSort = {created_date: -1}
		}
    const questions = await Question.find(req.query)
      .sort({ ...objSort })
      .populate([
        {
          path: "creator_id",
          model: UserModel,
        },
        {
          path: "tags",
          model: TagModel,
        },
      ]);

    res.status(200).json({
      status: "success",
      result: questions.length,
      data: {
        questions,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get question by id
exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id).populate([
      {
        path: "creator_id",
        model: UserModel,
      },
      {
        path: "tags",
        model: TagModel,
      },
    ]);
    if (!question) {
      return next(new AppError("Question not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// function update question by id
exports.updateQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
    if (String(req.user._id) != String(question.creator_id)) {
      return next(new AppError("You are not creator of this question", 401));
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
    if (req.body.description != null) {
      question.description = req.body.description;
    }
    const updatedQuestion = await question.save();

    res.status(200).json({
      status: "success",
      data: {
        question: updatedQuestion,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function delete question by id
exports.deleteQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
    if (String(req.user._id) != String(question.creator_id)) {
      return next(new AppError("Only creator can delete question", 401));
    }

    await question.remove();

    res.status(200).json({
      status: "success",
      data: null,
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
      return next(new AppError("Tag not found", 404));
    }
    const questions = await Question.find({
      tags: tag.name,
      ...req.query,
    });

    res.status(200).json({
      status: "success",
      result: questions.length,
      data: {
        questions,
      },
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
      return next(new AppError("Group not found", 404));
    }
    const questions = await Question.find({
      group: group._id,
      ...req.query,
    });

    res.status(200).json({
      status: "success",
      result: questions.length,
      data: {
        questions,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get question by user
exports.getQuestionByUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user == null) {
      return next(new AppError("User not found", 404));
    }
    let questions;
    if (req.params.creator_id) {
      questions = await Question.find({
        creator_id: req.params.creator_id,
        ...req.query,
      }).populate("creator_id");
    } else {
      questions = await Question.find({
        creator_id: user._id,
        ...req.query,
      }).populate("creator_id");
    }

    res.status(200).json({
      status: "success",
      result: questions.length,
      data: {
        questions,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// function get question by search
exports.getQuestionBySearch = async (req, res, next) => {
  try {
    const questions = await Question.find({
      $text: { $search: req.params.search },
    });

    res.status(200).json({
      status: "success",
      result: questions.length,
      data: {
        questions,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function close question by id
exports.closeQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
    if (String(req.user._id) != String(question.creator_id)) {
      return next(new AppError("You are not creator of this question", 401));
    }
    if (question.status == "closed") {
      return next(new AppError("Question already closed", 401));
    }
    question.status = "closed";
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      question,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        question: updatedQuestion,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// function reopen question by id
exports.reopenQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    console.log(question);

    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
    if (String(req.user._id) != String(question.creator_id)) {
      return next(new AppError("You are not creator of this question", 401));
    }
    if (question.status != "closed") {
      return next(new AppError("Question is not closed", 400));
    }
    if (question.accepted_answer_id != null) {
      return next(new AppError("Question has accepted answer", 400));
    }
    question.status = "open";
    console.log(question);
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      question,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        question: updatedQuestion,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function accept answer of question by id
exports.acceptAnswerToQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question == null) {
      return next(new AppError("Question not found", 404));
    }

    if (String(req.user._id) != String(question.creator_id)) {
      return next(new AppError("You are not creator of this question", 401));
    }

    if (question.status != "open") {
      return next(new AppError("Question is not open", 400));
    }

    if (question.accepted_answer_id) {
      return next(new AppError("Question has accepted answer", 400));
    }

    const answer = await AnswerModel.findById(req.body.answerId);
    if (!answer) {
      return next(new AppError("Answer not found", 404));
    }

    if (String(answer.question_id) != String(question._id)) {
      return next(new AppError("Answer is not belong to this question", 400));
    }

    answer.status = "approved";
    await AnswerModel.findByIdAndUpdate(req.body.answerId, answer, {
      new: true,
      runValidators: true,
    });

    question.accepted_answer_id = req.body.answerId;
    question.status = "closed";
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      question,
      {
        new: true,
        runValidators: true,
      }
    );

    // increase reputation of current user
    const user = await UserModel.findById(answer.creator_id);
    user.reputation += 10;
    await user.save();

    res.status(200).json({
      status: "success",
      data: {
        question: updatedQuestion,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function add answer to question by id
exports.addAnswerToQuestionById = async (req, res, next) => {
  try {
    req.body.creator_id = req.user._id;

    const question = await Question.findById(req.params.id);
    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
    if (question.status != "open") {
      return next(new AppError("Question is not open", 400));
    }

    if (question.acceptedAnswer != null) {
      return next(new AppError("Question has accepted answer", 400));
    }
    const answer = new AnswerModel({
      ...req.body,
      question_id: question._id,
    });

    const newAnswer = await answer.save();

    question.answers.push(newAnswer);
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      question._id,
      question,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("done update", updatedQuestion);
    res.status(200).json({
      status: "success",
      data: {
        question: updatedQuestion,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// function to remove answer of question by id
exports.removeAnswerOfQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
    const answer = await AnswerModel.findById(req.params.answerId);
    if (answer == null) {
      return next(new AppError("Answer not found", 404));
    }
    if (String(answer.creator_id) != String(req.user._id)) {
      return next(new AppError("You are not creator of this answer", 401));
    }
    if (question.status != "open") {
      return next(new AppError("Question is not open", 400));
    }

    // if (question.acceptedAnswer != null) {
    //   return next(new AppError("Question has accepted answer", 400));
    // }
    const updatedQuestion = await Question.findByIdAndUpdate(
      question._id,
      {
        $pull: { answers: answer._id },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    await AnswerModel.findByIdAndDelete(answer._id);
    res.status(200).json({
      status: "success",
      data: {
        question: updatedQuestion,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// get all answers of question by id
exports.getAllAnswersOfQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
    const answers = await AnswerModel.find({
      question_id: question._id,
    }).populate([
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

// function upvote question by id
exports.upVoteQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question == null) {
      return next(new AppError("Question not found", 404));
    }

		if (String(question.creator_id) == String(req.user._id)){
			return next(new AppError('Can not like your question', 400));
		}

    if (question.up_vote_users.includes(req.user._id)) {
      question.up_vote_users = question.up_vote_users.filter(
        (item) => String(item) != String(req.user._id)
      );
      // return next(new AppError("You have upvoted this question", 400));
    } else {
      question.up_vote_users.push(req.user._id);
    }

    if (question.down_vote_users.includes(req.user._id)) {
      question.down_vote_users = question.down_vote_users.filter(
        (item) => String(item) != String(req.user._id)
      );
    }

    const updatedQuestion = await question.save();

    // increase reputation of current user
    const user = await UserModel.findById(question.creator_id);
    user.reputation += 3;
    await user.save();

    res.status(200).json({
      status: "success",
      data: {
        question: updatedQuestion,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function downvote question by id
exports.downVoteQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question == null) {
      return next(new AppError("Question not found", 404));
    }

		if (String(question.creator_id) == String(req.user._id)){
			return next(new AppError('Can not dislike your question', 400));
		}

    if (question.down_vote_users.includes(req.user._id)) {
      question.down_vote_users = question.down_vote_users.filter(
        (item) => String(item) != String(req.user._id)
      );
      // return next(new AppError("You have downvoted this question", 400));
    } else {
      question.down_vote_users.push(req.user._id);
    }

    if (question.up_vote_users.includes(req.user._id)) {
      question.up_vote_users = question.up_vote_users.filter(
        (item) => String(item) != String(req.user._id)
      );

      // decrease reputation of current user
      const user = await UserModel.findById(answer.creator_id);
      user.reputation -= 3;
      await user.save();
    }

    const updatedQuestion = await question.save();

    res.status(200).json({
      status: "success",
      data: {
        question: updatedQuestion,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function upvote answer of question by id
exports.upvoteAnswerOfQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
		
    const answer = await AnswerModel.findById(req.body.answerId);

		if (String(answer.creator_id) == String(req.user._id)){
			return next(new AppError('Can not like your answer', 400));
		}

    if (answer.up_vote_users.includes(req.user._id)) {
      answer.up_vote_users = answer.up_vote_users.filter(
        (item) => String(item) != String(req.user._id)
      );
    } else {
      answer.up_vote_users.push(req.user._id);
    }
    if (answer.down_vote_users.includes(req.user._id)) {
      answer.down_vote_users = answer.down_vote_users.filter(
        (item) => String(item) != String(req.user._id)
      );
    }

    const updatedAnswer = await answer.save();

    // increase reputation of current user
    const user = await UserModel.findById(answer.creator_id);
    user.reputation += 3;
    await user.save();

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

// function downvote answer of question by id
exports.downvoteAnswerOfQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    const answer = await AnswerModel.findById(req.body.answerId);

		if (String(answer.creator_id) == String(req.user._id)){
			return next(new AppError('Can not dislike your answer', 400));
		}

    if (question == null) {
      return next(new AppError("Question not found", 404));
    }
    if (answer.down_vote_users.includes(req.user._id)) {
      answer.down_vote_users = answer.down_vote_users.filter(
        (item) => String(item) != String(req.user._id)
      );
    } else {
      answer.down_vote_users.push(req.user._id);
    }
    if (answer.up_vote_users.includes(req.user._id)) {
      answer.up_vote_users = answer.up_vote_users.filter(
        (item) => String(item) != String(req.user._id)
      );

      // decrease reputation of current user
      const user = await UserModel.findById(answer.creator_id);
      user.reputation -= 3;
      await user.save();
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

exports.saveQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    const user = await UserModel.findById(req.user._id);

    if (question == null) {
      return next(new AppError("Question not found", 404));
    }

		if (String(question.creator_id) == String(user._id)){
			return next(new AppError('Can not save your question', 400));
		}

    if (user.saved_questions.includes(question._id)) {
      user.saved_questions = user.saved_questions.filter(
        (item) => String(item) != String(question._id)
      );
    } else {
      user.saved_questions.push(question._id);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, user, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get count question of today
exports.getCountQuestionOfToday = async (req, res, next) => {
  try {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(today, tomorrow);
    const count = await Question.countDocuments({
      created_date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get count user of today
exports.getCountUserOfToday = async (req, res, next) => {
  try {
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await UserModel.countDocuments({
      created_date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get count answer of today
exports.getCountAnswerOfToday = async (req, res, next) => {
  try {
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await AnswerModel.countDocuments({
      created_date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get total count question
exports.getTotalCountQuestion = async (req, res, next) => {
  try {
    const count = await Question.countDocuments();

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get total count user
exports.getTotalCountUser = async (req, res, next) => {
  try {
    const count = await UserModel.countDocuments();

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get total count question which has accepted_answer_id
exports.getTotalCountQuestionHasAcceptedAnswer = async (req, res, next) => {
  try {
    const count = await Question.countDocuments({
      accepted_answer_id: { $ne: null },
    });

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// get total count answer
exports.getTotalCountAnswer = async (req, res, next) => {
  try {
    const count = await AnswerModel.countDocuments();

    res.status(200).json({
      status: "success",
      data: {
        count,
      },
    });
  } catch (err) {
    return next(err);
  }
};
