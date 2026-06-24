import React, { useEffect, useState } from 'react'
import { Star, Film, Users, Ticket, CircleDollarSign } from 'lucide-react'
import Title from './Title'
import BlurCircle from '../../components/BlurCircle'
import Loading from '../../components/Loading'
import dateFormat from '../../lib/dateFormat'
import { dummyDashboardData } from '../../assets/assets'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const currency = import.meta.env.VITE_CURRENCY || '$'
  const imageBaseURL = import.meta.env.VITE_IMAGE_BASE_URL || ''

  const fetchDashboardData = async () => {
    // TODO: replace with real API call once backend is ready
    // const { data } = await axios.get('/api/admin/dashboard', { headers: {...} })
    setDashboardData(dummyDashboardData)
    setLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (loading) return <Loading />

  if (!dashboardData) {
    return (
      <div className='relative'>
        <Title text1="Admin" text2="Dashboard" />
        <p className='text-gray-500'>Unable to load dashboard data. Please try again later.</p>
      </div>
    )
  }

  const dashboardCards = [
    { title: 'Total Bookings', value: dashboardData.totalBookings, icon: <Ticket /> },
    { title: 'Total Revenue', value: `${currency}${dashboardData.totalRevenue}`, icon: <CircleDollarSign /> },
    { title: 'Active Shows', value: dashboardData.activeShows?.length || 0, icon: <Film /> },
    { title: 'Total Users', value: dashboardData.totalUsers, icon: <Users /> },
  ]

  return (
    <div className='relative'>
      <BlurCircle top='-50px' right='0' />
      <Title text1="Admin" text2="Dashboard" />

      {/* 1. Stats Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
        {dashboardCards.map((card, index) => (
          <div key={index} className='bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center gap-4'>
            <div className='p-3 bg-primary/10 text-primary rounded-xl'>
              {card.icon}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>{card.title}</p>
              <p className='text-2xl font-bold'>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Active Shows List */}
      <h2 className='text-xl font-semibold mb-6'>Active Shows</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {(dashboardData.activeShows || []).map((show) => (
          <div key={show._id} className='bg-[#111] border border-white/5 p-4 rounded-2xl flex gap-4'>
            <img
              src={imageBaseURL + show.movie.poster_path}
              alt={show.movie.title}
              className='w-20 rounded-lg object-cover'
            />
            <div className='flex flex-col justify-between py-1'>
              <div>
                <h3 className='font-semibold line-clamp-1'>{show.movie.title}</h3>
                <p className='text-primary font-medium text-sm'>{currency}{show.price}</p>
              </div>
              <div className='flex items-center gap-4 text-xs text-gray-500'>
                <div className='flex items-center gap-1'>
                  <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                  <span>{show.movie.vote_average.toFixed(1)}</span>
                </div>
                <span>{dateFormat(show.showDateTime)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard