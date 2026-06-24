import React from 'react'
import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'

const MovieCard = ({ movie, onSelect }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    if (onSelect) onSelect(movie.id)
  }

  const handleNavigate = (event) => {
    event.stopPropagation()
    window.scrollTo(0, 0)
    navigate(`/movies/${movie.id}`)
  }

  return (
    <div onClick={handleSelect} className='bg-[#1a1a1a] rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group cursor-pointer border border-white/5'>
      <div className='relative aspect-2/3 overflow-hidden'>
        <img src={movie.backdrop_path} alt={movie.title} className='w-full h-full object-cover' />
      </div>
      
      <div className='p-4'>
        <h3 className='text-lg font-semibold truncate'>{movie.title}</h3>
        
        <div className='flex items-center gap-2 text-xs text-gray-400 mt-1'>
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span>•</span>
          <span>{movie.genres.slice(0, 2).map(g => g.name).join('/')}</span>
          <span>•</span>
          <span>{timeFormat(movie.runtime)}</span>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <button 
            onClick={handleNavigate}
            className='bg-primary text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all'
          >
            Buy Tickets
          </button>
          
          <div className='flex items-center gap-1 text-sm'>
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard