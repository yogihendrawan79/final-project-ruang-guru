import React, { useState } from 'react'
import { useEffect } from 'react'
// import Button from '../Button/Button'
import './card.css'

const Card = ({soals, onAnswer}) => {
  const [answer, setAnswer] = useState([])


  const handleAnswer = (indexSelected, indexOptionSelected) => {
    // e.preventDefault();
    const newAnswer = [...answer]
    newAnswer[indexSelected] = indexOptionSelected
    setAnswer(newAnswer)
    
    
  }
  

  useEffect(() => {
    console.log("Answers", answer)
  }, [answer])


  return (
    <>
      <div className="card-soal border-2 border-primary px-5 py-5">
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
                    onClick={() => handleAnswer(soal.id, option.a)}
                  >
                    {option.a}
                  </a>
                  <a
                    href="#/"
                    onClick={() => handleAnswer(soal.id, option.b)}
                  >
                    {option.b}
                  </a>
                  <a
                    href="#/"
                    onClick={() => handleAnswer(soal.id, option.c)}
                  >
                    {option.c}
                  </a>
                  <a
                    href="#/"
                    onClick={() => handleAnswer(soal.id, option.d)}
                  >
                    {option.d}
                  </a>
                </div>
              ))}
            </div>
          </div>
          ))}
          {/* <div className='mt-64 flex justify-between'>
            <button onClick={() => prevQuestion()}>Kembali</button>
            {quiz.length - 1 === currentQuestion ? (
              <Link to=''>
                Submit
              </Link>
              ) : (
              <button onClick={() => nextQuestion()}>Selanjutnya</button>
            )}
          </div> */}
      </div>
    </>
  )
}

export default Card