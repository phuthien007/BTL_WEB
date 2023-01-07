const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: "Answers",
  },
  detail: {
    type: String,
    required: true,
    trim: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blogs",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = mongoose.model("Comments", CommentSchema);

module.exports = CommentModel;
