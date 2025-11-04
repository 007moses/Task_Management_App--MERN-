import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  },
});

const TaskModel = mongoose.model("tasks", TaskSchema);

export default TaskModel;
