import React from 'react'
import MovieCard from '../components/MovieCard'
import { dummyShowsData } from '../assets/assets'

const Movies = () => {
  return (
    <div className='px-6 pt-24 pb-12 bg-black min-h-screen'>
      <h1 className='text-3xl font-bold mb-6 text-white'>Movies</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {dummyShowsData.map(movie => (
          <MovieCard key={movie._id || movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Movies