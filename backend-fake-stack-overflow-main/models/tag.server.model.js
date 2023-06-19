const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "questions",
    },
  ],

  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogs",
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

const TagModel = mongoose.model("Tags", TagSchema);

module.exports = TagModel;
