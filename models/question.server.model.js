const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  detail: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answers",
    },
  ],
  group: {
    type: Schema.Types.ObjectId,
    ref: "Groups",
  },
  up_vote: {
    type: Number,
    default: 0,
  },
  down_vote: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: "open",
  },
  closed_date: {
    type: Date,
  },
  accepted_answer: {
    type: Schema.Types.ObjectId,
    ref: "Answers",
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

const QuestionModel = mongoose.model("Questions", QuestionSchema);

module.exports = QuestionModel;
