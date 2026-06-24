import React from 'react'
import { dummyBookingData } from '../../assets/assets'

const ListBookings = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-3xl font-semibold'>List Bookings</h2>
        <p className='text-sm text-gray-400'>View all user bookings and payment status.</p>
      </div>

      <div className='grid gap-4'>
        {dummyBookingData.map((booking) => (
          <div key={booking._id + booking.amount} className='rounded-3xl border border-white/10 bg-[#111] p-6'>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
              <div>
                <p className='text-sm text-gray-400'>User</p>
                <p className='text-lg font-semibold'>{booking.user?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className='text-sm text-gray-400'>Movie</p>
                <p className='text-lg font-semibold'>{booking.show?.movie?.title || 'Unknown show'}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-gray-400'>Amount</p>
                <p className='text-lg font-semibold'>${booking.amount}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.isPaid ? 'bg-emerald-500/20 text-emerald-200' : 'bg-yellow-500/20 text-yellow-200'}`}>
                {booking.isPaid ? 'Paid' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListBookings
