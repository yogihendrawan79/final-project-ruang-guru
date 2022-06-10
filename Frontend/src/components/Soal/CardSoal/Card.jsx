import React from 'react'
// import Button from '../Button/Button'
import './card.css'

const Card = ({soals}) => {

  return (
    <>
      <div className="card-soal border-2 border-primary px-5 py-5">
        {soals.map((soals) => (
          <div key={soals.id}>
            <div>
              <p>{soals.question}</p>
            </div>
            <div className="opsi flex-row mt-2 cursor-default">
            {/* {soals.option.map((opsi) => (
              <p key={opsi}>{opsi}</p>
            ))} */}
              <p className='option inline-grid'>{soals.question.option}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Card