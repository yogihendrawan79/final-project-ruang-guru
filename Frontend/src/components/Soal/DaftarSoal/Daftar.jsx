import React from 'react'
import './daftar.css'

function Daftar({ soalsPerPage, totalSoals, paginate }) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalSoals / soalsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <div className="card border-2 border-primary px-5 py-5 ml-10">
        <p className='flex justify-center'>Daftar Soal</p>
        <div>
          {pageNumbers.map(number => (
            <div key={number} className="inline-block justify-center m-2 text-white">
              <a href="!#" onClick={() => paginate(number)} className="bg-primary rounded p-2">
                {number}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Daftar