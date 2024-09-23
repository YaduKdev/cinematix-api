import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, movieTheater, user } = req.body;

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
      date: new Date(`${date}`),
      movieTheater,
      user,
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
