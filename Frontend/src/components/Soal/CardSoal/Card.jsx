import React from 'react'
import './card.css'

function Card({soal, option}) {
  console.log(option)
  return (
    <>
      <div className="card-soal border-2 border-primary px-5 py-5">
        <div>
          <p className='flex justify-start'>{soal}</p>
        </div>
        <div className="opsi flex-row mt-2 cursor-default">
          <p>{option.A}</p>
          <p>{option.B}</p>
          <p>{option.C}</p>
          <p>{option.D}</p>
        </div>
      </div>
    </>
  )
}

export default Card