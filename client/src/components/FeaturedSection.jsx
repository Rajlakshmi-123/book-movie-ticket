import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets' // Use dummy data from assets for now
import MovieCard from './MovieCard'
import BlurCircle from './BlurCircle'
import BlueCircle from './BlueCircle'

const FeaturedSection = ({ onMovieSelect }) => {
  const navigate = useNavigate();

  return (
    <div className='px-6 md:px-10 lg:px-16 py-16 relative overflow-hidden bg-[#050505] text-white'>
      {/* Faint background image */}
      <div
        className='absolute inset-0 -z-30 bg-cover bg-center opacity-10'
        style={{ backgroundImage: `url(${assets.screenImage})` }}
      />
      {/* Dark gradient overlay to improve contrast */}
      <div className='absolute inset-0 -z-20 bg-linear-to-t from-black/80 to-transparent' />

      <BlueCircle top='-80px' left='-120px' size={'w-[520px] h-[520px]'} opacity={'opacity-20'} />
      <BlurCircle top='0' right='-80px' />

      <div className='flex items-center justify-between mb-10'>
        <div>
          <p className='text-primary font-medium uppercase tracking-wider mb-2'>Now Showing</p>
          <h2 className='text-3xl md:text-4xl font-semibold text-white'>Featured Movies</h2>
        </div>
        
        <button 
          onClick={() => navigate('/movies')}
          className='flex items-center gap-2 text-gray-200 hover:text-white transition-colors group'
        >
          View All <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
        </button>
      </div>

      {/* Movie Grid - Displays first 4 movies */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {dummyShowsData.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />
        ))}
      </div>

      {/* Show More Button */}
      <div className='flex justify-center mt-12'>
        <button 
          onClick={() => { navigate('/movies'); window.scrollTo(0,0); }}
          className='bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-3 rounded-full transition-all'
        >
          Show More
        </button>
      </div>
    </div>
  )
}

export default FeaturedSection