import React from 'react'

const AddSource = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-3xl font-semibold'>Add New Show</h2>
        <p className='text-sm text-gray-400'>Create a new show entry and publish it to the system.</p>
      </div>

      <div className='rounded-3xl border border-white/10 bg-[#111] p-6'>
        <form className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <input className='w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none' placeholder='Movie Title' />
            <input className='w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none' placeholder='Release Date' />
          </div>
          <textarea className='w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none' rows='4' placeholder='Overview' />
          <div className='grid gap-4 md:grid-cols-2'>
            <input className='w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none' placeholder='Poster URL' />
            <input className='w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none' placeholder='Backdrop URL' />
          </div>
          <button className='rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 transition'>Save Show</button>
        </form>
      </div>
    </div>
  )
}

export default AddSource
