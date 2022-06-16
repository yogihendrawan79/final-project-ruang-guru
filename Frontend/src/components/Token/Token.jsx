import React from 'react'
import Navbar from '../Navbar/Navbar'
import './token.css'

const Token = () => {
  return (
    <div className="flex flex-col justify-center text-center">
      <Navbar logo=".ET" image="" />
      <div className="p-10 token">

        <form className=" max-w-xl mx-auto p-12 bg-white shadow-xl rounded-lg">
          <h2 className="font-medium text-3xl">Masukan Token</h2>
          <div className="">
            <p>Silahkan masukan token yang anda terima dari guru anda</p>
          </div>
          <div className="mt-10">
            <input className="border border-gray-300 p-2 w-70 rounded-full w-full" type="text" placeholder="contoh: EXJFKDFGDNB232VFV" />
          </div>
          <div>
            <button className=" bg-primary hover:bg-blue-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 align-content-center mt-5 w-1/2  text-white p-2 rounded-full">Proses</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Token