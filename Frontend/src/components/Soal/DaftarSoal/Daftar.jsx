import React from 'react'
import './daftar.css'

function Daftar({ soalsPerPage, totalSoals, paginate, currentPage }) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalSoals / soalsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <div className="w-64 border-2 border-primary px-5 py-5 ml-10">
        <p className='flex justify-center font-bold'>Daftar Soal</p>
        <div className='grid grid-cols-4 gap-4'>
          {pageNumbers.map(number => (
            <div key={number} className="mt-5 m-2 text-white">
              <a
                href="#/"
                onClick={() => paginate(number)}
                className={[ number === currentPage ? 'bg-primary text-white' : 'bg-transparent text-primary', 'font-bold', 'text-center', 'p-2', 'rounded' ].join(' ')}
              >
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