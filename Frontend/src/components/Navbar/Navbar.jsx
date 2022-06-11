import React from 'react'
import downarrow from '../../assets/down-arrow.png'
import './navbar.css'

function Navbar(props) {
  const { logo, username, image, countdown } = props;
  return (
    <>
      <div className="container-lg bg-primary">
        <div className="container flex justify-between py-5">
          <div className='navbar-brand pl-28'>
            <a href='/' className='text-2xl text-white font-bold'>{logo}</a>
          </div>
          <div>
            <span className='text-white'>Waktu tersisa {countdown}</span>
          </div>
          <div className='flex justify-center align-middle'>
            <p className='pr-3 text-white'>Hi, {username}</p>
            <img src={image} alt="profile" className='profile' />
            <img src={downarrow} alt="" className='' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar