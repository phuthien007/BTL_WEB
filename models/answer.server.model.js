const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },
  status: {
    type: String,
    trim: true,
  },
  detail: {
    type: String,
    required: true,
    trim: true,
  },
  up_vote_users: {
    type: [Schema.Types.ObjectId],
		ref: 'Users',
    default: 0,
  },
  down_vote_users: {
    type: [Schema.Types.ObjectId],
		ref: 'Users',
    default: 0,
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
