import Todo from "../models/todo.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

// CREATE
const createTodo = async (req, res) => {
  const { title, description = "", finished = false, status = 0 } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required for Todo...");
  }

  try {
    const newTodo = await Todo.create({ title, description, finished, status });

    return res
      .status(201)
      .json(new ApiResponse(201, newTodo, "Todo created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// GET ALL
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, todos, "Fetched all Todos"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { title, description, finished, status } = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new ApiError(404, `Todo with id:${id} not found`);
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (finished !== undefined) todo.finished = finished;
    if (status !== undefined) todo.status = status;

    const updated = await todo.save();

    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Todo updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// DELETE
const deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new ApiError(404, `Todo with id:${id} not found`);
    }

    await todo.deleteOne();

    return res
      .status(200)
      .json(new ApiResponse(200, { id }, "Todo deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { createTodo, getTodos, updateTodo, deleteTodo };
