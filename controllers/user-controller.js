import User from "../models/User.js";
import bcrypt from "bcryptjs";

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

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim === "" &&
    !password &&
    password.trim === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let user;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim === "" && !password && password.trim === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let user;

  try {
    user = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(500).json({ message: "User doesn't exist" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res.status(200).json({ message: "Login Successfull" });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim === "" &&
    !password &&
    password.trim === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let user;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  return res.status(200).json({ message: "Updated Successfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;

  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  return res.status(200).json({ message: "Deleted Successfully" });
};
