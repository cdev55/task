import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    default: "No Description",
  },
  imagePath:{
    type:String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
