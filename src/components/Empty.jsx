import React from 'react'

const Empty = () => {
  return (
    <div className='flex items-center justify-center w-full text-white'>
        <div className='flex gap-3'>
          <span>Go To File </span>
          <span className="kbd">Ctrl</span>+<span className="kbd">P</span>
        </div>
    </div>
  )
}

export default Empty
