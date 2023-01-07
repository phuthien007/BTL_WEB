const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Groups",
  },
  title: {
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
  view_count: {
    type: Number,
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

const BlogModel = mongoose.model("Blogs", BlogSchema);

module.exports = BlogModel;
