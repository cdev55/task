import bcrypt from "bcrypt";

import Admin from "../models/adminSchema.js";


export const adminSignUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin Already Exists! Login Instead" });
    }
    const hashedPassword = bcrypt.hashSync(password,10);
  
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      
    });
  
    try {
      await admin.save();
    } catch (err) {
      return console.log(err);
    }
    return res.status(201).json({ admin });
  };
  
  export const adminLogIn = async (req, res, next) => {
    const { email, password } = req.body;
    let existingAdmin;
    try {
      existingAdmin = await Admin.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (!existingAdmin) {
      return res.status(404).json({ message: "Couldnt Find Admin By This Email" });
    }
  
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    return res
      .status(200)
      .json({ message: "Login Successfull", admin: existingAdmin });
  };
  