import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { name,email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({
      status: {
        message: "User Already Exists! Login Instead",
        code: 400,
      }
    // return res
    //   .status(400)
    //   .json({ message: "User Already Exists! Login Instead" });
  })}
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Couldnt Find User By This Email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ status:{message: "Auth failed"} });
  }
  const token=jwt.sign(
    {email:email,userId:user._id,},process.env.JWT_KEY,{expiresIn:'1h'}
  )
  return res
    .status(200)
    .json({status:{message: "Login Successfull", code: 200},data:{
      token:token,
      expiresIn:3600,
      userId:user._id,
      name:user.name
    } });
};
