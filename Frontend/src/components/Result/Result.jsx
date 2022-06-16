import React, { useState } from 'react'
import NavbarToken from '../Navbar/NavbarToken'
import Image from '../../assets/images.jpg'
import Button from '../Soal/Button/Button'
import './result.css'

const Result = () => {
  const [status] = useState('Lulus')
  return (
    <> 
      <NavbarToken logo=".ET" username="John" image={Image} />
      <div className="card mx-auto mt-16 py-2 shadow-2xl px-4">
        <div className="circle bg-primary text-center mt-10 border-2 mx-auto border-primary border-solid">
          <h1 className='mt-12 font-bold text-5xl'>80</h1>
          <p>Nilai anda</p>
        </div>
        {status === "Lulus" 
          ? 
            <div>
              <h1 className='font-bold text-center mt-2 text-2xl text-lulus'>Selamat</h1>
              <div className='mt-2'>
                <p className='text-center'>Anda telah lulus dalam mata pelajaran matematika</p>
              </div>
            </div>
          :
            <div>
              <h1 className='font-bold text-center mt-2 text-2xl text-gagal'>Mohon maaf!</h1>
              <div className='mt-2'>
                <p className='text-center'>Anda tidak lulus dalam mata pelajaran matematika</p>
              </div>
            </div>
        }
        <div className='button flex justify-center mt-4'>
          <Button button="Selesai" />
        </div>
      </div>
    </>
  )
}

export default Result