import express from "express";
import {
  deleteBooking,
  getBookingByID,
  handleCheckout,
  newBooking,
} from "../controllers/booking-controller.js";

const bookingRouter = express.Router();

bookingRouter.get("/:id", getBookingByID);
bookingRouter.post("/", newBooking);
bookingRouter.delete("/:id", deleteBooking);
bookingRouter.post("/create-checkout-session", handleCheckout);

export default bookingRouter;
