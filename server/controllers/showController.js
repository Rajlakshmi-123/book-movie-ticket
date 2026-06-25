import axios from "axios";
import Movie from "../models/movie.js";
import Show from "../models/show.js";

// API to get "Now Playing" movies from TMDB [5, 6]
export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    });

    res.json({ success: true, movies: data.results });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to add a new show [4, 7]
export const addShow = async (req, res) => {
  try {
    const { movieId, showInput, showPrice } = req.body;

    // Check if movie already exists in our database [8]
    let movie = await Movie.findById(movieId);

    // If movie doesn't exist, fetch details and cast from TMDB and save it [7, 9]
    if (!movie) {
      const movieDetailsRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
      });
      
      const movieCreditsRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
      });

      const movieData = movieDetailsRes.data;
      const castData = movieCreditsRes.data.cast;

      movie = await Movie.create({
        _id: movieId,
        title: movieData.title,
        overview: movieData.overview,
        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path,
        release_date: movieData.release_date,
        original_language: movieData.original_language,
        genres: movieData.genres,
        casts: castData,
        vote_average: movieData.vote_average,
        runtime: movieData.runtime,
      });
    }

    // Create the show entries for the database [10, 11]
    const showsToCreate = [];
    showInput.forEach(item => {
      item.time.forEach(time => {
        const dateTimeString = `${item.date}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice: Number(showPrice),
          occupiedSeats: {}
        });
      });
    });

    await Show.insertMany(showsToCreate);
    res.json({ success: true, message: "Show added successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};