import express from "express";
import { login, signup } from "../controllers/userControllers.js";

const userrouter = express.Router();


userrouter.post("/signup", signup);
userrouter.post("/login", login);
export default userrouter;