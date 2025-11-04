import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./app/config/db.js";
import UserRouter from "./app/routes/user-router.js";
import TaskRouter from "./app/routes/task-router.js";
dotenv.config({ quiet: true });

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/users", UserRouter);
app.use("/api/tasks", TaskRouter);

app.listen(port, () => {
  console.log(`Server listening to the port: ${port}`);
});
