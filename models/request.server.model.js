const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// request join group
const RequestSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Groups",
    required: true,
  },

  status: {
    type: String,
    required: true,
    trim: true,
    default: "pending",
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

const RequestModel = mongoose.model("Requests", RequestSchema);

module.exports = RequestModel;
