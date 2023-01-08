const AnswerModel = require("../models/answer.server.model");
const QuestionModel = require("../models/question.server.model");
const UserModel = require("../models/user.server.model");
const CommentModel = require("../models/comment.server.model");

const AppError = require("../utils/app.error");

// function create comment
exports.createComment = async (req, res, next) => {
  const comment = new CommentModel(req.body);
  try {
    const newComment = await comment.save();

    res.status(201).json({
      status: "success",
      data: {
        comment: newComment,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get all comment
exports.getAllComment = async (req, res, next) => {
  try {
    const comments = await CommentModel.find(req.query);

    res.status(201).json({
      status: "success",
      result: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get comment by id
exports.getCommentById = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) {
      return next(new AppError("Comment not found with that id", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function update comment by id
exports.updateCommentById = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return next(new AppError("Comment not found with that id", 404));
    }

    if (comment.creator != req.user._id) {
      return next(new AppError("Only creator can update comment", 404));
    }
    if (req.body.content) {
      comment.content = req.body.content;
    }

    const updatedComment = await comment.save();

    res.status(200).json({
      status: "success",
      data: {
        comment: updatedComment,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function delete comment by id
exports.deleteCommentById = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return next(new AppError("Comment not found with that id", 404));
    }
    if (comment.creator != req.user._id) {
      return next(new AppError("Only creator can update comment", 404));
    }

    await comment.remove();

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};

// function get all comment of answer
exports.getAllCommentOfAnswer = async (req, res, next) => {
  try {
    const answer = await AnswerModel.findById(req.params.id);
    if (!answer) {
      return next(new AppError("Answer not found with that id", 404));
    }

    const comments = await CommentModel.find({ answer: req.params.id });

    res.status(200).json({
      status: "success",
      result: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get all comment of blog
exports.getAllCommentOfBlog = async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return next(new AppError("Blog not found with that id", 404));
    }
    const comments = await CommentModel.find({ blog: req.params.id });

    res.status(200).json({
      status: "success",
      result: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function comment answer
exports.commentAnswer = async (req, res, next) => {
  const comment = new CommentModel({
    content: req.body.content,
    creator: req.user._id,
    answer: req.params.id,
  });

  try {
    const newComment = await comment.save();

    res.status(200).json({
      status: "success",
      data: {
        comment: newComment,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function comment blog
exports.commentBlog = async (req, res, next) => {
  const comment = new CommentModel({
    content: req.body.content,
    creator: req.user._id,
    blog: req.params.id,
  });

  try {
    const newComment = await comment.save();

    res.status(201).json({
      status: "success",
      data: {
        comment: newComment,
      },
    });
  } catch (err) {
    return next(err);
  }
};
