import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: { type: String, required: true },
  bookingsOpen: { type: Boolean },
  language: {
    type: String,
    required: true,
  },
  trailerLink: { type: String },
  genre: {
    type: String,
    required: true,
  },
  nowPlaying: [
    {
      type: {
        name: [{ type: String }],
        location: { type: String },
      },
    },
  ],
  actors: [
    {
      type: {
        name: { type: String },
        imageUrl: { type: String },
      },
      required: true,
    },
  ],
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  cities: [{ type: String, required: true }],
});

export default mongoose.model("Movie", movieSchema);
