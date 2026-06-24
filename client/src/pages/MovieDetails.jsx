import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyShowsData, dummyDateTimeData } from '../assets/assets'
import { Star, PlayCircle, Heart } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const fetchMovieData = () => {
    const foundMovie = dummyShowsData.find(item => item._id === id || item.id === Number(id));

    if (foundMovie) {
      setMovie(foundMovie);
    }
  }

  useEffect(() => {
    fetchMovieData();
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return <Loading />;
  }

  return (
    <div className='px-6 md:px-10 lg:px-16 py-32 min-h-screen relative overflow-hidden bg-black text-white'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl'>
        {/* 1. Movie Poster */}
        <div className='w-full md:max-w-[220px] flex-shrink-0'>
          <img
            src={movie.poster_path}
            alt={movie.title}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x450/1a1a1a/666?text=No+Image' }}
            className='w-full rounded-xl border border-white/10 shadow-2xl object-cover'
          />
        </div>

        {/* 2. Movie Information */}
        <div className='flex-1 relative'>
          <BlurCircle top='-50px' left='-50px' />

          <p className='text-primary font-medium mb-2 uppercase tracking-widest text-sm'>
            {movie.original_language === 'en' ? 'English' : movie.original_language}
          </p>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 text-white'>{movie.title}</h1>

          <div className='flex items-center gap-2 mb-6'>
            <Star className='w-5 h-5 text-yellow-500 fill-yellow-500' />
            <span className='text-lg font-medium text-white'>{movie.vote_average.toFixed(1)}</span>
            <span className='text-gray-400'>({movie.vote_count} User Ratings)</span>
          </div>

          <p className='text-gray-300 leading-relaxed max-w-2xl mb-8'>
            {movie.overview}
          </p>

          <div className='flex items-center gap-4 text-sm text-gray-200 mb-10'>
            <span className='bg-white/5 border border-white/10 px-4 py-2 rounded-lg'>{timeFormat(movie.runtime)}</span>
            <span>•</span>
            <span>{movie.genres.map(g => g.name).join(', ')}</span>
            <span>•</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>

          {/* 3. Action Buttons */}
          <div className='flex flex-wrap items-center gap-4'>
            <button className='flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full transition-all text-white'>
              <PlayCircle className='w-5 h-5 text-primary' /> Watch Trailer
            </button>

            <a href="#date-select" className='bg-primary text-white px-10 py-3 rounded-full font-medium hover:bg-red-600 transition-all'>
              Buy Tickets
            </a>

            <button className='p-3 bg-white/5 border border-white/10 rounded-full hover:text-primary transition-all text-white'>
              <Heart className='w-6 h-6' />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Cast Section */}
      <div className='mt-12 max-w-6xl'>
        <p className='text-xl font-semibold mb-6 text-white'>Your Favorite Cast</p>

        <div className='flex items-center gap-6 overflow-x-auto no-scroll-bar pb-4'>
          {movie.casts.slice(0, 12).map((actor, index) => (
            <div key={index} className='flex flex-col items-center text-center min-w-[100px]'>
              <img
                src={actor.profile_path}
                alt={actor.name}
                className='w-20 h-20 rounded-full object-cover border-2 border-white/5 mb-2'
              />
              <p className='text-xs font-medium text-gray-300 max-w-[90px]'>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Date Selection */}
      <DateSelect dateTime={dummyDateTimeData} id={id} />

      {/* 6. Recommended Movies Section */}
      <div className='mt-20 max-w-6xl'>
        <p className='text-2xl font-semibold mb-8 text-center md:text-left'>You May Also Like</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {dummyShowsData
            .filter(item => item._id !== movie._id)
            .slice(0, 3)
            .map((recMovie, index) => (
              <MovieCard key={index} movie={recMovie} />
            ))}
        </div>

        <div className='flex justify-center mt-12'>
          <button
            onClick={() => { navigate('/movies'); window.scrollTo(0, 0); }}
            className='bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-3 rounded-full transition-all text-white'
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails