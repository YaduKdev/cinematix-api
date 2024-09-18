import express from "express";
import {
  deleteBooking,
  getBookingByID,
  newBooking,
} from "../controllers/booking-controller.js";

const bookingRouter = express.Router();

bookingRouter.get("/:id", getBookingByID);
bookingRouter.post("/", newBooking);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
