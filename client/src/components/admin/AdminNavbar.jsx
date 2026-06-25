import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between border-b border-white/10 bg-[#090909] px-6 py-4'>
      <Link to='/admin' className='flex items-center gap-3'>
        <img src={assets.logo} alt='Admin Logo' className='w-10' />
        <div>
          <p className='text-lg font-semibold'>Admin Portal</p>
          <p className='text-xs text-gray-500'>Manage shows and bookings !! </p>
        </div>
      </Link>
      <div className='rounded-2xl border border-white/10 bg-black px-4 py-2 text-sm text-gray-300'>Admin</div>
    </div>
  )
}

export default AdminNavbar
