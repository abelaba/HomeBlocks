import React from 'react'
import { NavLink } from 'react-router-dom'

export default function DecoratedLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className='flex flex-col items-center py-2 px-7 mx-4 cursor-pointer'
    >
      {({ isActive }) => (
        <>
          {children}
          <div
            className={`w-1 h-1 bg-blue-500 rounded-full mt-1 ${isActive ? 'block' : 'hidden'}`}
          ></div>
        </>
      )}
    </NavLink>
  )
}
