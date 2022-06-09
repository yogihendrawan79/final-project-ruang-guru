import React from 'react'
import Button from '../Button/Button'
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
          <ul>
            <li className='option inline-grid'>
              <a href='/#'>{option.A}</a>
              <a href='/#'>{option.B}</a>
              <a href='/#'>{option.C}</a>
              <a href='/#'>{option.D}</a>
            </li>
          </ul>
        </div>
        <Button />
      </div>
    </>
  )
}

export default Card