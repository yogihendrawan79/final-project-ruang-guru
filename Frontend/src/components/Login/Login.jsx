import React from 'react'
// import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './login.css'

const Login = () => {
  // let navigate = useNavigate();
  // Menggunakan useNavigate dari reac-router-dom untuk mengecek role dan redirect ke dashboard atau ujian
  return (
    <div className="bg-primary w-full h-full login">
      <Navbar logo=".ET" />
      <div className="grid grid-cols-2 ">
        <div className='hidden sm:block max-w-[1240px] mx-auto grid md:grid-cols-2'>
          <img className="mt-40 object-cover h-48 w-97 pt-98" src="" alt='' />
        </div>

        <div className='flex flex-col justify-center px-auto mt-20'>
          <form className="border-2 border-gray-600 max-w-sm mx-auto p-12 bg-white shadow-md rounded-md">
            <h2 className="text-3xl font-bold text-center">Masuk</h2>
            <div className="flex flex-col text-black-300 py-2">
              <label>E-mail</label>
              <input className="border-2 border-violet-600 p-2 w-full rounded-full" type="text" />
            </div>
            <div className="flex flex-col text-black-300 py-2">
              <label>Kata Sandi</label>
              <input className="border-2 border-violet-600 p-2 w-full rounded-full" type="password" />
            </div>
            <button className="hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 align-content-center mt-5 w-full bg-blue-500 text-white p-2 rounded-full">Masuk</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login