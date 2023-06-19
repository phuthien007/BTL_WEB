const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  creator_id: {
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
  content: {
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
  group: {
    type: Schema.Types.ObjectId,
    ref: "Groups",
  },
  up_vote_users: {
    type: Array,
    default: [],
  },
  down_vote_users: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    required: true,
    trim: true,
    // open, closed
    default: "open",
  },
  closed_date: {
    type: Date,
  },
  accepted_answer_id: {
    type: Schema.Types.ObjectId,
    ref: "Answers",
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answers",
    },
  ],
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
