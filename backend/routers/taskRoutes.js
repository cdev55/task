import express from "express";
import { addTask, deleteTask, getAllTask, getTaskById, updateTask } from "../controllers/taskControllers.js";
import { checkAuth } from "../middleware/check-auth.js";
import multer from "multer";
// import { storage } from "../controllers/taskControllers.js";
import fileUploadHandler from "../middleware/file-upload-handler.js"


const taskrouter = express.Router();

taskrouter.get("/", getAllTask);
taskrouter.get("/:id", getTaskById);
taskrouter.post("/",checkAuth,fileUploadHandler, addTask);
taskrouter.put("/:id",checkAuth,fileUploadHandler, updateTask);
taskrouter.delete("/:id",checkAuth, deleteTask);
export default taskrouter;