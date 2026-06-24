import React from 'react'
import { dummyShowsData } from '../../assets/assets'

const ListSource = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-3xl font-semibold'>List Shows</h2>
        <p className='text-sm text-gray-400'>Browse and manage the current show sources.</p>
      </div>

      <div className='grid gap-4'>
        {dummyShowsData.map((movie) => (
          <div key={movie._id || movie.id} className='rounded-3xl border border-white/10 bg-[#111] p-6'>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
              <div>
                <h3 className='text-xl font-semibold'>{movie.title}</h3>
                <p className='text-sm text-gray-400'>{movie.genres.map((g) => g.name).join(', ')}</p>
              </div>
              <div className='flex flex-wrap gap-2 text-sm text-gray-300'>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>${movie.vote_average.toFixed(1)}</span>
                <span>{movie.runtime} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListSource
