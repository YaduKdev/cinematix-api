import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const { URL } = process.env;

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const newBooking = async (req, res, next) => {
  const { movie, movieTheater, user, sessionId } = req.body;

  let existingMovie;
  let existingUser;

  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found With Given ID" });
  }

  let booking;

  try {
    booking = new Booking({
      movie,
      date: new Date(),
      movieTheater,
      user,
      sessionId,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    existingMovie.bookings.push(booking);
    existingUser.bookings.push(booking);

    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });

    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable To Create Booking" });
  }

  return res.status(201).json({ booking });
};

export const getBookingByID = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Booking.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }

  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Booking.findByIdAndDelete(id).populate("user movie");

    const session = await mongoose.startSession();
    session.startTransaction();

    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);

    await booking.user.save({ session });
    await booking.movie.save({ session });

    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable To Delete" });
  }

  return res.status(200).json({ message: "Successfully Deleted" });
};

export const handleCheckout = async (req, res) => {
  const { seats } = req.body;

  const lineItems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: `${seats.totalSeats} ${
            seats.totalSeats > 1 ? "Seats" : "Seat"
          }`,
          images: ["https://i.ibb.co/mT6w3Pq/logo.png"],
        },
        unit_amount: seats.totalAmount * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    custom_text: {
      submit: {
        message:
          "Use Card Number: 4000003560000008. Add Any 3 Digit CVC And Upcoming Expiry Date And Select Country India",
      },
    },
    success_url: `${URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${URL}/fail`,
  });

  return res.json({ id: session.id });
};
