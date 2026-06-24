import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 text-white">
      <div className="px-6 md:px-10 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Logo and App Store Links */}
          <div className="flex flex-col gap-6">
            <img src={assets.logo} alt="Logo" className="w-32" />
            <p className="text-white/80 text-sm max-w-xs leading-relaxed">
              Quickso is your premier destination for booking movie tickets online. Experience seamless booking and enjoy the latest blockbusters.
            </p>
            <div className="flex items-center gap-4">
              <img src={assets.googlePlay} alt="Google Play" className="h-9 cursor-pointer" />
              <img src={assets.appStore} alt="App Store" className="h-9 cursor-pointer" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="flex flex-col gap-3 text-white/80 text-sm">
              <li className="hover:text-primary cursor-pointer transition-colors">Home</li>
              <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <div className="flex flex-col gap-3 text-white/80 text-sm">
              <p>Phone: +1-234-567-890</p>
              <p>Email: contact@quickso.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-white/5 mt-14 pt-8 text-center">
          <p className="text-white/60 text-xs uppercase tracking-widest">
            Copyright @ GreatStack All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer