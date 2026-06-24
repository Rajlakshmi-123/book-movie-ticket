import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import MyBooking from './pages/MyBooking'
import SeatLayout from './pages/SeatLayout'
import Favorite from './pages/Favorite'
import Layout from './pages/admin/layout'
import Dashboard from './pages/admin/dashboard'
import AddSource from './pages/admin/adds'
import ListSource from './pages/admin/listSource'
import ListBookings from './pages/admin/listBookings'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useUserSafe } from './lib/clerkSafe'
import { SignIn } from '@clerk/clerk-react'

const App = () => {
  const location = useLocation();
  
  // Logic to check if the current URL is an Admin route [4]
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { user } = useUserSafe();

  return (
    <>
      <Toaster /> {/* Enables global toast notifications [4, 5] */}
      
      {/* Display Navbar only if NOT an admin route [4] */}
      {!isAdminRoute && <Navbar />}

      <main className='min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<div className='pt-20'><Movies /></div>} />
          <Route path='/movies/:id' element={<div className='pt-20'><MovieDetails /></div>} />
          <Route path='/movies/:id/:date' element={<div className='pt-20'><SeatLayout /></div>} />
          <Route path='/my-bookings' element={<div className='pt-20'><MyBooking /></div>} />
          <Route path='/favorite' element={<div className='pt-20'><Favorite /></div>} />
          
          {/* Admin dashboard routes */}
          <Route path='/admin/*' element={user ? <Layout /> : <SignIn fallbackRedirectUrl='/admin' />}>
            <Route index element={<Dashboard />} />
            <Route path='add-so' element={<AddSource />} />
            <Route path='list-source' element={<ListSource />} />
            <Route path='list-bookings' element={<ListBookings />} />
          </Route>
        </Routes>
      </main>

      {/* Display Footer only if NOT an admin route [5] */}
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App