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
            <input className="border border-primary p-2 w-70 rounded-full w-full" type="text" placeholder="contoh: EXJFKDFGDNB232VFV" />
          </div>
          <div>
            <button
              className="mt-5 hover:bg-primary border border-solid text-primary border-primary p-1 w-28 text-center rounded-2xl hover:text-white"
              // onClick={}
            >
              Proses
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Token