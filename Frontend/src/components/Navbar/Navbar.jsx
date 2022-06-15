import React from 'react'
import { Link } from 'react-router-dom';
// import downarrow from '../../assets/down-arrow.png'
import './navbar.css'

function Navbar({ logo, username, image, countdown }) {
  return (
    <>
      <div className="container-lg bg-primary">
        <div className="container flex justify-between py-5">
          <div className='navbar-brand pl-28'>
            <Link to={'#/'} className='text-2xl text-white font-bold'>{logo}</Link>
          </div>
          <div>
            <span className='text-white'>Waktu tersisa {countdown}</span>
          </div>
          <div className='flex justify-center align-middle'>
            <p className='pr-5 text-white username'>Hi, {username}</p>
            <img src={image} alt="profile" className='profile' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar