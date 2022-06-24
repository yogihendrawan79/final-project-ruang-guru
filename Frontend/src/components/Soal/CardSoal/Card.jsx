import React from 'react'
import './card.css'

const Card = ({ soals, onAnswer, answer }) => {


  return (
    <>
      <div>
        {soals.map((soal) => (
          <div key={soal.id_soal}>
            <div>
              <p>{soal.pertanyaan}</p>
            </div>
            <div className="mt-2 cursor-pointer grid grid-rows-4 ">
              <a
                href="/#"
                onClick={() => onAnswer(soal.id_soal, soal.opsi.opsi_a)}
                className={[answer[soal.id_soal] === soal.opsi.opsi_a ? 'bg-primary ' : null, 'p-2 rounded-md']}
              >
                A. {soal.opsi.opsi_a}
              </a>
              <a
                href="/#"
                onClick={() => onAnswer(soal.id_soal, soal.opsi.opsi_b)}
                className={[answer[soal.id_soal] === soal.opsi.opsi_b ? 'bg-primary text-white' : null, 'p-2 rounded-md']}
              >
                B. {soal.opsi.opsi_b}
              </a>
              <a
                href="/#"
                onClick={() => onAnswer(soal.id_soal, soal.opsi.opsi_c)}
                className={[answer[soal.id_soal] === soal.opsi.opsi_c ? 'bg-primary text-white' : null, 'p-2 rounded-md']}
              >
                C. {soal.opsi.opsi_c}
              </a>
              <a
                href="/#"
                onClick={() => onAnswer(soal.id_soal, soal.opsi.opsi_d)}
                className={[answer[soal.id_soal] === soal.opsi.opsi_d ? 'bg-primary text-white' : null, 'p-2 rounded-md']}
              >
                D. {soal.opsi.opsi_d}
              </a>
            </div>
          </div>
          ))}
      </div>
    </>
  )
}

export default Card