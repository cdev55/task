import bcrypt from "bcrypt";

import User from "../model/useSchema.js";


export const userSignUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists! Login Instead" });
    }
    const hashedPassword = bcrypt.hashSync(password);
  
    const user = new User({
      name,
      email,
      password: hashedPassword,
      
    });
  
    try {
      await user.save();
    } catch (err) {
      return console.log(err);
    }
    return res.status(201).json({ user });
  };
  
  export const userLogIn = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(404).json({ message: "Couldnt Find User By This Email" });
    }
  
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    return res
      .status(200)
      .json({ message: "Login Successfull", user: existingUser });
  };
  ///////////////Update Profile///////////////////////////
export const updateProfile = async (req, res, next) => {
    const { name,email,password } = req.body;
    const profileId = req.params.id;
    let existingUser;
    try {
      existingUser = await User.findById({ profileId });
    } catch (err) {
      return console.log(err);
    }
    const isNewPasswordSame = bcrypt.compareSync(password, existingUser.password);
    if (isNewPasswordSame) {
      return res.status(400).json({ message: "New password same as old Password." });
    }
    let profile;
    try {
        profile = await User.findByIdAndUpdate(profileId, {name,email,password});
    } catch (err) {
      return console.log(err);
    }
    if (!profile) {
      return res.status(500).json({ message: "Unable To Update The Profile" });
    }
    return res.status(200).json({ profile });
  };