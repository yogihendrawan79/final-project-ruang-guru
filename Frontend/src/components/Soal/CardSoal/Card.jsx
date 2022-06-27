import React from "react";
import "./card.css";

const Card = ({ soals, onAnswer, answer }) => {
  return (
    <>
      <div>
        {soals.map((soal) => (
          <div key={soal.id_soal}>
            <div>
              <p>
                {soal.id_soal}. {soal.pertanyaan}
              </p>
            </div>
            <div className="mt-2 cursor-pointer grid grid-rows-4 ">
              <div className="flex">
                {/* <div className='w-36 mr-3 p-2 text-center shadow-2xl' > */}
                <div
                  className={[
                    answer[soal.id_soal] === "A"
                  ?
                    "bg-primary "
                  : null,
                    "font-bold mr-3 p-2 text-center shadow-2xl h-10 w-20 rounded-md"
                  ]}
                >
                  <a
                    href="/#"
                    onClick={() => onAnswer(soal.id_soal, (soal.opsi.opsi_a ? "A" : null))}
                  className={[
                    answer[soal.id_soal] === "B"
                  ?
                    "bg-primary "
                  : null,
                    "font-bold mr-3 p-2 text-center h-10 w-20 shadow-2xl rounded-md"
                  ]}
                >
                  <a
                    href="/#"
                    onClick={() => onAnswer(soal.id_soal, (soal.opsi.opsi_b ? "B" : null))}
                  >
                    B. {soal.opsi.opsi_b}
                  </a>
                </div>
              </div>
              <div className="flex mt-5">
                <div
                  className={[
                    answer[soal.id_soal] === "C"
                  ?
                    "bg-primary "
                  : null,
                    "font-bold mr-3 p-2 text-center h-10 w-20 shadow-2xl rounded-md"
                  ]}
                >
                  <a
                  href="/#"
                  onClick={() => onAnswer(soal.id_soal, (soal.opsi.opsi_c ? "C" : null))}
                  >
                    C. {soal.opsi.opsi_c}
                  </a>
                </div>
                <div
                  className={[
                    answer[soal.id_soal] === "D"
                  ?
                    "bg-primary "
                  : null,
                    "font-bold mr-3 p-2 text-center h-10 w-20 shadow-2xl rounded-md"
                  ]}
                >
                  <a
                  href="/#"
                  onClick={() => onAnswer(soal.id_soal, (soal.opsi.opsi_d ? "D" : null))}
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
  );
};

export default Card;
