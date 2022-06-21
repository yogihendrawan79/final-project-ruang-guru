import React from 'react'
import './card.css'

const Card = ({ soals, onAnswer, answer }) => {


  return (
    <>
      <div>
        {soals.map((soal) => (
          <div key={soal.id}>
            <div>
              <p>{soal.question}</p>
            </div>
            <div className="mt-2 cursor-pointer grid grid-rows-4 ">
              {soal.option.map((option, index) => (
                <div key={index}>
                  <a
                    href="#/"
                    onClick={() => onAnswer(soal.id, option.a)}
                    className={[answer[soal.id] === option.a ? 'bg-primary text-white' : null, 'p-2 rounded-md']}
                  >
                    {option.a}
                  </a>
                  <a
                    href="#/"
                    onClick={() => onAnswer(soal.id, option.b)}
                    className={[answer[soal.id] === option.b ? 'bg-primary text-white' : null, 'p-2 rounded-md']}
                  >
                    {option.b}
                  </a>
                  <a
                    href="#/"
                    onClick={() => onAnswer(soal.id, option.c)}
                    className={[answer[soal.id] === option.c ? 'bg-primary text-white' : null, 'p-2 rounded-md']}
                  >
                    {option.c}
                  </a>
                  <a
                    href="#/"
                    onClick={() => onAnswer(soal.id, option.d)}
                    className={[answer[soal.id] === option.d ? 'bg-primary text-white' : null, 'p-2 rounded-md']}
                  >
                    {option.d}
                  </a>
                </div>
              ))}
            </div>
          </div>
          ))}
      </div>
    </>
  )
}

export default Card