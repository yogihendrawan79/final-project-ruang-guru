import React from 'react'
import Profile from '../../assets/images.jpg'
import downarrow from '../../assets/down-arrow.png'
import './navbar.css'

function Navbar() {
  return (
    <>
      <div className="container-lg bg-primary">
        <div className="container flex justify-between px-28 py-5">
          <div className='navbar-brand'>
            <a href='/' className='text-2xl text-white font-bold'>.ET</a>
          </div>
          <div className='flex justify-center align-middle'>
            <p className='pr-3 text-white'>John</p>
            <img src={Profile} alt="profile" className='profile' />
            <img src={downarrow} alt="" className='' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar