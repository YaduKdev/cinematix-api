import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  movieTheater: {
    type: {
      name: { type: String },
      location: { type: String },
      seatNumbers: [{ type: String }],
      date: { type: String },
      time: { type: String },
    },
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessionId: { type: String, required: true },
});

export default mongoose.model("Booking", bookingSchema);
