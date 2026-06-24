import React from 'react'

const BlueCircle = ({ top = 'auto', left = 'auto', right = 'auto', bottom = 'auto', size = 'w-72 h-72', opacity = 'opacity-20' }) => {
  return (
    <div
      className={`absolute ${size} bg-primary/20 rounded-full blur-[100px] -z-10 ${opacity}`}
      style={{ top, left, right, bottom }}
    />
  )
}

export default BlueCircle