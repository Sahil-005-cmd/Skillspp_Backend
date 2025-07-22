import express, { json } from "express"
import ApiError  from "./src/utils/apiError.js";
import ApiResponse from "./src/utils/apiResponse.js";
import dotenv from "dotenv"
import { createTodo, deleteTodo, getTodos, updateTodo } from "./src/controllers/todo.controller.js";

dotenv.config()

const app = express();

let todos=[];

app.use(express.json())

app.get('/todos',getTodos)

app.post('/createTodo',createTodo)

app.put('/updateTodo/:id',updateTodo)

app.delete('/deleteTodo/:id',deleteTodo)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
})