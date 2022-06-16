import React, { useState } from 'react'
import { useEffect } from 'react'
import './card.css'

const Card = ({soals, onAnswer}) => {
  const [answer, setAnswer] = useState([])

  const handleAnswerA = (e) => {
    e.preventDefault();
    
    soals.map((soal) => (
      setAnswer(soal.option.a)
    ))
    onAnswer(answer)
  }
  const handleAnswerB = (e) => {
    e.preventDefault();
    
    soals.map((soal) => (
      setAnswer(soal.option.b)
      ))
      onAnswer(answer)
  }
  const handleAnswerC = (e) => {
    e.preventDefault();
    
    soals.map((soal) => (
      setAnswer(soal.option.c)
    ))
    onAnswer(answer)
  }
  const handleAnswerD = (e) => {
    e.preventDefault();
    
    soals.map((soal) => (
      setAnswer(soal.option.d)
    ))
    onAnswer(answer)
  }

  useEffect(() => {
    console.log("Answer", answer)
  }, [answer])


  return (
    <>
      <div className="card-soal border-2 border-primary px-5 py-5">
        {soals.map((soal) => (
          <div key={soal.id}>
            <div>
              <p>{soal.question}</p>
            </div>
            <div className="mt-2 cursor-default grid grid-rows-4 ">
              <a href='#/' onClick={handleAnswerA}>{soal.option.a}</a>
              <a href='#/' onClick={handleAnswerB}>{soal.option.b}</a>
              <a href='#/' onClick={handleAnswerC}>{soal.option.c}</a>
              <a href='#/' onClick={handleAnswerD}>{soal.option.d}</a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Card