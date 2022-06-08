import React from 'react'
import './daftar.css'

function Daftar() {
  return (
    <>
      <div className="card border-2 border-primary px-5 py-5 ml-10">
        <p className=''>Daftar Soal</p>
        <div className='flex justify-around mt-2 text-white'>
          <div className='rounded p-2 bg-primary'>1</div>
          <div className='rounded p-2 bg-primary'>2</div>
          <div className='rounded p-2 bg-primary'>3</div>
        </div>
        <div className='flex justify-around mt-2 text-white'>
          <div className='rounded p-2 bg-primary'>4</div>
          <div className='rounded p-2 bg-primary'>5</div>
          <div className='rounded p-2 bg-primary'>6</div>
        </div>
        <div className='flex justify-around mt-2 text-white'>
          <div className='rounded p-2 bg-primary'>7</div>
          <div className='rounded p-2 bg-primary'>8</div>
          <div className='rounded p-2 bg-primary'>9</div>
        </div>
      </div>
    </>
  )
}

export default Daftar