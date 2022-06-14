import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLogo = ({ logo }) => {
  return (
    <>
      <div className='navbar-brand pl-28 py-5'>
        <Link to={'#/'} className='text-2xl text-white font-bold'>{logo}</Link>
      </div>
    </>
  )
}

export default NavbarLogo