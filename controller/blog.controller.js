const AnswerModel = require("../models/answer.server.model.js");
const QuestionModel = require("../models/question.server.model.js");
const UserModel = require("../models/user.server.model.js");
const BlogModel = require("../models/blog.server.model.js");

const AppError = require("../utils/app.error");

// function create blog
exports.createBlog = async (req, res, next) => {
  const blog = new BlogModel(req.body);
  try {
    const newBlog = await blog.save();

    res.status(201).json({
      status: "success",
      data: {
        blog: newBlog,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get all blog
exports.getAllBlog = async (req, res, next) => {
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
    const blogs = await BlogModel.find(req.query).sort({ ...objSort });

    res.status(200).json({
      status: "success",
      result: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function get blog by id
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return next(new AppError("Blog not found with that id", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function update blog by id
exports.updateBlogById = async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return next(new AppError("Blog not found with that id", 404));
    }

    if (blog.creator != req.user._id) {
      return next(new AppError("Only creator can update answer", 401));
    }

    if (req.body.content) {
      blog.content = req.body.content;
    }

    const updatedBlog = await blog.save();

    res.status(200).json({
      status: "success",
      data: {
        blog: updatedBlog,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// function delete blog by id
exports.deleteBlogById = async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return next(new AppError("Blog not found with that id", 404));
    }

    if (blog.creator != req.user._id) {
      return next(new AppError("Only creator can update answer", 401));
    }

    await blog.remove();

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};

// function get my blog
exports.getMyBlog = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find({ creator: req.user._id });

    res.status(200).json({
      status: "success",
      result: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    return next(err);
  }
};
