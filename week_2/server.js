import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from "./models/todo.model.js";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "./controllers/todo.controllers.js";
import ApiError from "./utils/apiError.js";
import ApiResponse from "./utils/apiResponse.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/todos", getTodos);
app.post("/todos", createTodo);
app.put("/todos/:id", updateTodo);
app.delete("/todos/:id", deleteTodo);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, null, err.message));
  }

  console.error(err.stack);
  return res
    .status(500)
    .json(new ApiResponse(500, null, "Internal Server Error"));
});