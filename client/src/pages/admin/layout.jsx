import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'

const Layout = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <AdminNavbar />
      <div className='flex'>
        <AdminSidebar />
        <div className='flex-1 p-8 lg:p-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
