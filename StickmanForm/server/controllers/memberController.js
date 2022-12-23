import Member from "../models/memberSchema.js";

//Adding members

export const addMember = async (req, res) => {
  let member;
  try {
    member = req.body;
    let newMember = new Member(member);
    await newMember.save();
    res.status(200).json({ msg: "New member added successfully !!", member });
  } catch (error) {
    res.status(500).json({ msg: "Error while adding the new member", error });
  }
};

//Getting All members

export const getMembers = async (req, res) => {
  let members;
  try {
    members = await Member.find();
  } catch (error) {
    return console.log(error);
  }
  if (!members) {
    return res.status(404).json({ msg: "No member found in database" });
  }
  res.status(200).json({ members });
};
