import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-black'>
      <div className='w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin'></div>
    </div>
  )
}

export default Loading