import React from 'react'
import { NavLink } from 'react-router-dom'

function NavbarItem({to,icon,title,extraStyle,spanStyle}) {
  return (
    <NavLink className={`text-white ${extraStyle} text-[18px]  flex items-center space-x-5 mb-6 font-bold `} to={to}>
        {icon}
        <span className={`${spanStyle}`}>{title}</span>
    </NavLink>
  )
}

export default NavbarItem