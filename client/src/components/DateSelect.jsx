import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BlurCircle from './BlurCircle'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const DateSelect = ({ dateTime, id }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!selected) {
      return toast.error("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo(0, 0);
  };

  return (
    <div id='date-select' className='py-20 relative text-white'>
      <BlurCircle top='0' left='-100px' />

      <p className='text-2xl font-semibold mb-8 text-center md:text-left'>Choose Date</p>

      <div className='flex items-center justify-center md:justify-start gap-4'>
        <ChevronLeft className='cursor-pointer text-gray-500 hover:text-white' />

        <div className='grid grid-cols-3 md:grid-cols-6 gap-4'>
          {Object.keys(dateTime).map((date) => (
            <button
              key={date}
              onClick={() => setSelected(date)}
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${selected === date ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 hover:border-primary/50 text-white'}`}
            >
              <span className='text-xl font-bold'>{new Date(date).getDate()}</span>
              <span className='text-xs uppercase opacity-70'>
                {new Date(date).toLocaleString('en-US', { month: 'short' })}
              </span>
            </button>
          ))}
        </div>

        <ChevronRight className='cursor-pointer text-gray-500 hover:text-white' />
      </div>

      <button
        onClick={handleBookNow}
        className='mt-10 w-full md:w-auto bg-primary text-white px-16 py-3 rounded-full font-medium hover:bg-red-600 transition-all'
      >
        Book Now
      </button>
    </div>
  )
}

export default DateSelect