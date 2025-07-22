
const createTodo = (req,res)=>{
    const title = req.body?.title
    const description = req.body?.description || ""
    const finished = req.body?.finished || false
    const status = req.body?.finished || 0
    
    console.log(title)
    console.log(description)
    console.log(finished)
    console.log(status)
    // 0 -> Not started
    // 1 -> In progress
    // 2 -> Finished
    if(!title){
        throw new ApiError(404, "Title is required for Todo...")
    }
    console.log("After check ")
    const id = Date.now()
    const todo = {id,title, description, finished, status}
    todos.push(todo)
    
    res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo has been created successfully"));
}

const deleteTodo = (req,res)=>{
    const id = req.params?.id

    const idx = todos.findIndex(todo =>todo.id == id)
    
    if(!id){
        throw new ApiError(400, "Id required for deleting Todo...")
    }
    if(idx == -1){
        throw new ApiError(400, "Provide valid id for Todo...")
    }

    todos.splice(idx, 1)

    res
    .status(200)
    .json(new ApiResponse(200, id, `The todo id:${id} has been deleted...`))
}

const updateTodo = (req,res)=>{
    const id = req.params.id
    
    const idx = todos.findIndex(todo =>todo.id == id)
    
    if(!id){
        throw new ApiError(400, "Id required for deleting Todo...")
    }

    if (idx === -1) {
      throw new ApiError(404, `Todo with id:${id} not found`);
    }

    const {title,description,finished,status}  = req.body
    
    console.log(title)
    console.log(description)
    console.log(finished)
    console.log(status)


  if (title) todos[idx].title = title;
  if (description) todos[idx].description = description;
  if (finished !== undefined) todos[idx].finished = finished;
  if (status !== undefined) todos[idx].status = status;

  res.status(200).json(new ApiResponse(200, todos[idx], "Todo updated successfully"));
}

const getTodos = (req,res)=>{

    res
    .status(200)
    .send(todos)
}
export {createTodo, getTodos, updateTodo, deleteTodo}