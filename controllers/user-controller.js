import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(200).json({ users });
};
