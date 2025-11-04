import UserModel from "../models/UserModel.js";
import TaskModel from "../models/TaskMode.js";
import mongoose from "mongoose";

const createTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title } = req.body;
    if (!title) {
      return res.status("Empty task should not be added");
    }
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ message: "You are not authorized user" });
    }
    const task = new TaskModel({
      userId,
      title,
    });
    await task.save();
    return res.status(201).json({ message: "Task Added", data: task });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAlltasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ message: "You are not authorized user" });
    }
    const tasks = await TaskModel.find({
      userId,
    });
    if (tasks.length ===0   ) {
      return res
        .status(404)
        .json({ message: "Not tasks available for this user" });
    }
    return res
      .status(200)
      .json({ message: "Tasks details fetched successfully", data: tasks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title cannot be empty" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: id },
      { title },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Success
    return res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "You are not an authorized user" });
    }

    const deletedTask = await TaskModel.findOneAndDelete({ _id: id });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or already deleted" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { createTask, getAlltasks, updateTask, deleteTask };
