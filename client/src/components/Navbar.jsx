import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X, TicketPlus } from 'lucide-react'
import { useUserSafe, useClerkSafe, UserButtonSafe } from '../lib/clerkSafe'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserSafe(); // Hook to get the current user status [4]
  const { openSignIn } = useClerkSafe(); // Hook to trigger the login modal [2]
  const navigate = useNavigate();

  // Function to close the mobile menu and scroll to top when a link is clicked [5]
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }

  return (
    <div className='flex items-center justify-between px-6 py-4 md:px-10 lg:px-16 fixed top-0 w-full bg-black/80 backdrop-blur-md z-50'>
      
      {/* Logo linking to Home [6, 7] */}
      <Link to="/" onClick={handleLinkClick} className='flex-1 md:flex-none'>
        <img src={assets.logo} alt="Quickso Logo" className='w-28 md:w-32' />
      </Link>

      {/* Desktop & Mobile Navigation Links [8, 9] */}
      <div className={`fixed md:static top-0 right-0 h-screen md:h-auto bg-black md:bg-transparent flex flex-col md:flex-row items-center gap-8 pt-20 md:pt-0 transition-all duration-300 z-40 ${isOpen ? 'w-full' : 'w-0 overflow-hidden md:w-auto'}`}>
        
        {/* Mobile Close Button [9, 10] */}
        <X className='absolute top-6 right-6 cursor-pointer md:hidden' onClick={() => setIsOpen(false)} />
        
        <Link to="/" onClick={handleLinkClick} className='text-white hover:text-primary transition-colors'>Home</Link>
        <Link to="/movies" onClick={handleLinkClick} className='text-white hover:text-primary transition-colors'>Movies</Link>
        <Link to="/theaters" onClick={handleLinkClick} className='text-white hover:text-primary transition-colors'>Theaters</Link>
        <Link to="/releases" onClick={handleLinkClick} className='text-white hover:text-primary transition-colors'>Releases</Link>
      </div>

      {/* Action Bar: Search, Login/Profile, and Mobile Toggle [2, 11, 12] */}
      <div className='flex items-center gap-4 md:gap-6'>
        <Search className='w-5 cursor-pointer text-white hover:text-primary transition-colors' />
        
        {/* Dynamic Authentication Section [2, 3, 13, 14] */}
        {user ? (
          <UserButtonSafe>
            {/* Custom menu item inside the Profile Dropdown [14] */}
          </UserButtonSafe>
        ) : (
          <button 
            onClick={() => openSignIn()} 
            className='bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition-all'
          >
            Login
          </button>
        )}

        {/* Mobile Menu Icon [11, 15] */}
        <Menu className='w-6 cursor-pointer md:hidden' onClick={() => setIsOpen(true)} />
      </div>
    </div>
  )
}

export default Navbar