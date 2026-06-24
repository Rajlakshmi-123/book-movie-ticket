import React, { useState, useEffect } from 'react'
import { dummyBookingData } from '../assets/assets'
import timeFormat from '../lib/timeFormat'
import dateFormat from '../lib/dateFormat'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchMyBookings = () => {
    setBookings(dummyBookingData);
    setLoading(false);
  }

  useEffect(() => {
    fetchMyBookings();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className='px-6 md:px-10 lg:px-16 py-32 min-h-screen relative overflow-hidden bg-black text-white'>
      <BlurCircle top='0' left='0' />
      <BlurCircle bottom='0' left='600px' />

      <h1 className='text-3xl font-bold mb-10'>My Bookings</h1>

      <div className='flex flex-col gap-6'>
        {bookings.map((item, index) => (
          <div key={index} className='bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row justify-between gap-8'>

            {/* Left: Movie Info */}
            <div className='flex gap-6'>
              <img
                src={item.show.movie.poster_path}
                className='w-24 md:w-32 rounded-xl object-cover'
                alt="Movie"
              />
              <div className='flex flex-col'>
                <h2 className='text-xl font-semibold mb-2 text-white'>{item.show.movie.title}</h2>
                <p className='text-gray-400 text-sm mb-1'>{timeFormat(item.show.movie.runtime)}</p>
                <p className='text-primary font-medium mt-auto'>
                  {dateFormat(item.show.showDateTime)}
                </p>
              </div>
            </div>

            {/* Right: Payment & Seats */}
            <div className='flex flex-col md:items-end justify-between'>
              <div className='mb-4 md:text-right'>
                <p className='text-2xl font-bold text-white'>{currency}{item.amount}</p>

                {!item.isPaid && (
                  <button className='mt-2 bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-all'>
                    Pay Now
                  </button>
                )}
              </div>

              <div className='text-sm text-gray-400 md:text-right'>
                <p><span className='text-gray-500'>Total Tickets:</span> {item.bookedSeats.length}</p>
                <p><span className='text-gray-500'>Seat Number:</span> {item.bookedSeats.join(', ')}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings