import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Todo title is required"],
  },
  description: {
    type: String,
    default: "",
  },
  finished: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    default: 0, // 0: Not started, 1: In progress, 2: Finished
  },
}, { timestamps: true });

export default mongoose.model("Todo", todoSchema);