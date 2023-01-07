const TagModel = require("../models/tag.server.model");
const AppError = require('../utils/app.error');

// function create tag
exports.createTag = async (req, res, next) => {
  const tag = new TagModel(req.body);
  try {
    const newTag = await tag.save();

    res.status(201).json({
			status: 'success',
			data: {
				tag: newTag
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function get all tag
exports.getAllTag = async (req, res, next) => {
  try {
    const tags = await TagModel.find();

    res.status(200).json({
			status: 'success',
			result: tags.length,
			data: {
				tags
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function get tag by id
exports.getTagById = async (req, res, next) => {
  try {
    const tag = await TagModel.findById(req.params.id);
    if (tag == null) {
      return next(new AppError('Tag not found', 404));
    }

    res.status(200).json({
			status: 'success',
			data: {
				tag
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function update tag by id
exports.updateTagById = async (req, res, next) => {
  try {
    const tag = await TagModel.findById(req.params.id);
    if (tag == null) {
      return next(new AppError('Tag not found', 404));
    }
    if (tag.creator != req.user._id) {
      return next(new AppError('You are not creator of this tag', 401));
    }
    if (req.body.name != null) {
      tag.name = req.body.name;
    }
    const updatedTag = await tag.save();

    res.status(200).json({
			status: 'success',
			data: {
				tag: updatedTag
			}
		});
  } catch (err) {
    return next(err);
  }
};

// function delete tag by id
exports.deleteTagById = async (req, res, next) => {
  try {
    const tag = await TagModel.findById(req.params.id);
    if (tag == null) {
      return next(new AppError('Tag not found', 404));
    }

    if (tag.creator != req.user._id) {
			return next(new AppError('You are not creator of this tag', 401));
    }

    await tag.remove();

    res.status(200).json({
			status: 'success',
			data: null
		});
  } catch (err) {
    return next(err);
  }
};

// function get all tag by user id

exports.getAllTagByUserId = async (req, res, next) => {
  try {
    const tags = await TagModel.find({ creator: req.params.id });

    res.status(200).json({
			status: 'success',
			result: tags.length,
			data: {
				tags
			}
		});
  } catch (err) {
    return next(err);
  }
};
