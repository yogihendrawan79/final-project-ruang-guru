import React from 'react'
import './card.css'

const Card = ({ soals, onAnswer, answer }) => {

  return (
    <>
      <div>
        {soals.map((soal) => (
          <div key={soal.id_soal}>
            <div>
              <p>{soal.id_soal}. {soal.pertanyaan}</p>
            </div>
            <div className="mt-2 cursor-pointer grid grid-rows-4 ">
              <div className="flex">
                {/* <div className='w-36 mr-3 p-2 text-center shadow-2xl' > */}
                <div 
                  className={[
<<<<<<< HEAD
                    answer[soal.id_soal] === soal.opsi.opsi_a
=======
                    answer[soal.id_soal] === "A"
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
                  ?
                    "bg-primary "
                  : null,
                    "font-bold mr-3 p-2 text-center shadow-2xl h-10 w-20 rounded-md"
                  ]}
                >
                  <a
                    href="/#"
<<<<<<< HEAD
                    onClick={() => onAnswer(soal.id_soal, soal.opsi.opsi_a)}
=======
                    onClick={() => onAnswer(soal.id_soal, (soal.opsi.opsi_a ? "A" : null))}
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
                  >
                    A. {soal.opsi.opsi_a}
                  </a>
                </div>
                <div 
                  className={[
<<<<<<< HEAD
                    answer[soal.id_soal] === soal.opsi.opsi_b
=======
                    answer[soal.id_soal] === "B"
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
                  ?
                    "bg-primary "
                  : null,
                    "font-bold mr-3 p-2 text-center h-10 w-20 shadow-2xl rounded-md"
                  ]}
                >
                  <a
                    href="/#"
<<<<<<< HEAD
                    onClick={() => onAnswer(soal.id_soal, soal.opsi.opsi_b)}
=======
                    onClick={() => onAnswer(soal.id_soal, (soal.opsi.opsi_b ? "B" : null))}
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
                  >
                    B. {soal.opsi.opsi_b}
                  </a>
                </div>
              </div>
              <div className="flex mt-5">
                <div 
                  className={[
<<<<<<< HEAD
                    answer[soal.id_soal] === soal.opsi.opsi_c
=======
                    answer[soal.id_soal] === "C"
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
                  ?
                    "bg-primary "
                  : null,
                    "font-bold mr-3 p-2 text-center h-10 w-20 shadow-2xl rounded-md"
                  ]}
                >
                  <a
                  href="/#"
<<<<<<< HEAD
                  onClick={() => onAnswer(soal.id_soal, soal.opsi.opsi_c)}
=======
                  onClick={() => onAnswer(soal.id_soal, (soal.opsi.opsi_c ? "C" : null))}
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
                  >
                    C. {soal.opsi.opsi_c}
                  </a>
                </div>
                <div 
                  className={[
<<<<<<< HEAD
                    answer[soal.id_soal] === soal.opsi.opsi_d
=======
                    answer[soal.id_soal] === "D"
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
                  ?
                    "bg-primary "
                  : null,
                    "font-bold mr-3 p-2 text-center h-10 w-20 shadow-2xl rounded-md"
                  ]}
                >
                  <a
                  href="/#"
<<<<<<< HEAD
                  onClick={() => onAnswer(soal.id_soal, soal.opsi.opsi_d)}
=======
                  onClick={() => onAnswer(soal.id_soal, (soal.opsi.opsi_d ? "D" : null))}
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
                  >
                    D. {soal.opsi.opsi_d}
                  </a>
                </div>
              </div>
            </div>
          </div>
          ))}
      </div>
    </>
  )
}

export default Card