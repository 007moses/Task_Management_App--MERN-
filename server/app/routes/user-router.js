import { Router } from "express";
import { register, login, getUser } from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/getUser',authMiddleware,getUser);

export default router;
