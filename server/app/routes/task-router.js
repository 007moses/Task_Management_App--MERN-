import { createTask, getAlltasks,updateTask,deleteTask } from "../controllers/task-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { Router } from "express";
const router = Router();

router.post("/add", authMiddleware, createTask);
router.get("/getTasks", authMiddleware, getAlltasks);
router.put('/updateTask/:id',authMiddleware,updateTask);
router.delete('/deleteTask/:id',authMiddleware,deleteTask)

export default router;
