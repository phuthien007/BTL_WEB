const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  question_id: {
    type: Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },
  status: {
    type: String,
    trim: true,
    default: "not approved",
  },
  content: {
    type: String,
    trim: true,
  },
  up_vote_users: {
    type: [Schema.Types.ObjectId],
    ref: "Users",
    default: [],
  },
  down_vote_users: {
    type: [Schema.Types.ObjectId],
    ref: "Users",
    default: [],
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
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

const AnswerModel = mongoose.model("Answers", AnswerSchema);

module.exports = AnswerModel;
