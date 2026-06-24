import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, List, Ticket } from 'lucide-react'
import { assets } from '../../assets/assets'

const AdminSidebar = () => {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Add Show', path: '/admin/add-so', icon: <PlusCircle size={20} /> },
    { name: 'List Shows', path: '/admin/list-source', icon: <List size={20} /> },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: <Ticket size={20} /> },
  ]

  return (
    <div className='min-h-screen w-72 bg-[#111] border-r border-white/10 p-6 flex flex-col gap-10'>
      <div className='flex items-center gap-3'>
        <img src={assets.profile} className='w-12 h-12 rounded-full object-cover' alt='Admin' />
        <div>
          <p className='font-semibold'>Admin User</p>
          <p className='text-xs text-gray-500'>Administrator</p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        {adminLinks.map((link) => (
          <NavLink
            end={link.path === '/admin'}
            key={link.path}
            to={link.path}
            className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            {link.icon}
            <span className='font-medium'>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
