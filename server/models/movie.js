import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // The TMDB Movie ID
  title: { type: String, required: true },
  overview: { type: String, required: true },
  poster_path: { type: String, required: true },
  backdrop_path: { type: String, required: true },
  release_date: { type: String, required: true },
  original_language: { type: String },
  tagline: { type: String },
  genres: { type: Array, required: true },
  casts: { type: Array, required: true },
  vote_average: { type: Number, required: true },
  runtime: { type: Number, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Movie = mongoose.models.movie || mongoose.model('movie', movieSchema);

export default Movie;