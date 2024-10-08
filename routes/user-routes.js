import express from "express";
import {
  getAllUsers,
  signup,
  login,
  updateUser,
  deleteUser,
  getUserBookings,
} from "../controllers/user-controller.js";

const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/bookings/:id", getUserBookings);

export default userRouter;
