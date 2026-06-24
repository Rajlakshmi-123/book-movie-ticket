import React from 'react'
import { assets } from '../assets/assets'
import backgroundImage from '../assets/backgroundImage.png'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col justify-center items-start px-6 md:px-10 lg:px-16 bg-cover bg-center h-screen w-full relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      
      {/* Marvel Logo */}
      <img src={assets.marvelLogo} alt="Marvel Logo" className='w-24 md:w-32 mb-4' />

      {/* Movie Title */}
      <h1 className='text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight max-w-2xl'>
        Avengers : <br /> Infinity War
      </h1>

      {/* Movie Info (Genres, Year, Duration) */}
      <div className='flex items-center gap-4 mt-4 text-sm md:text-base text-gray-300'>
        <span className='bg-white/10 px-3 py-1 rounded-md border border-white/20'>Action</span>
        <span className='bg-white/10 px-3 py-1 rounded-md border border-white/20'>Adventure</span>
        
        <div className='flex items-center gap-1 ml-2'>
          <Calendar className='w-4 h-4 text-primary' />
          <span>2018</span>
        </div>

        <div className='flex items-center gap-1'>
          <Clock className='w-4 h-4 text-primary' />
          <span>2h 29m</span>
        </div>
      </div>

      {/* Description */}
      <p className='mt-6 text-gray-400 max-w-lg text-sm md:text-base leading-relaxed'>
        As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos.
      </p>

      {/* Watch Button */}
      <button 
        onClick={() => navigate('/movies')} 
        className='mt-8 bg-primary text-white flex items-center gap-2 px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-all group'
      >
        Watch Movie
        <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
      </button>

      {/* Bottom Gradient overlay for smooth transition */}
      <div className='absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent'></div>
    </div>
  )
}

export default HeroSection