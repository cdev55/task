import ToDo from "../models/todoSchema.js";

/////////Get All ToDo////////////////
export const getAllToDo = async (req, res) => {
  let ToDos;
  try {
    ToDos = await ToDo.find();
  } catch (error) {
    console.log(error);
  }
  if (!ToDos) {
    res.status(404).json({ msg: "No ToDos found" });
  }
  res.status(200).json({ ToDos });
};
/////////Create ToDo////////////////
export const createToDo = async (req, res) => {
  let todo;
  try {
    todo = req.body;
    let newTodo = new ToDo(todo);
    await newTodo.save();
    res.status(200).json({ msg: "Todo saved successfully !!", todo });
  } catch (error) {
    res.status(500).json({ msg: "Error while saving ToDo details", error });
  }
};
////////Update ToDo////////////////
export const updateToDo = async (req, res) => {
  const id = req.params.id;
  let { title} = req.body;
  let todo;
  try {
    todo = await ToDo.findByIdAndUpdate(id, { title});
    return res.status(200).json({ msg: "Todo Updated successfully !!", todo });
  } catch (error) {
    console.log(error);

  }
  if (!todo) {
    res.status(404).json({ msg: "Todo not found"});
  }
  
};
///////Delete ToDo////////////////
export const deleteToDo = async (req, res) => {
    const id =req.params.id;
    let todo;
    try {
        todo=await ToDo.findByIdAndDelete(id);
        res.status(200).json({ msg: "Todo Deleted successfully !!" });


    } catch (error) {
        res.status(500).json({ msg: "Error Deleting ToDo !!", error });
        
    }
};
