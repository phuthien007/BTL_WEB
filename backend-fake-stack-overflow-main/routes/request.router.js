const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
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
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

const RequestModel = mongoose.model("Requests", requestSchema);
