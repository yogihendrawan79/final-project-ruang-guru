import React, { useState, useEffect } from 'react'
import Images from '../../assets/images.jpg'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Card from './CardSoal/Card'
import Daftar from './DaftarSoal/Daftar'


function Soal() {
  const [soals, setSoals] = useState([]);
  const [currentPage, setCurrentPage] = useState(false)
  const [soalsPerPage] = useState(1)
  const [answer, setAnswer] = useState({})

  useEffect(() => {
    const fetchSoals = async () => {
      const res = await axios.get('http://localhost:8000/soal')
      setSoals(res.data)
    }

    fetchSoals();
  }, [])

  // Get current soal
  const indexOfLastSoal = currentPage * soalsPerPage;
  const indexOfFirstSoal = indexOfLastSoal - soalsPerPage;
  const currentSoals = soals.slice(indexOfFirstSoal, indexOfLastSoal)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  
  const handleAllAnswer = (indexSelected, indexOptionSelected) => {
    const newAnswer = {...answer}
    newAnswer[indexSelected] = indexOptionSelected
    setAnswer(newAnswer)
    
    if (currentPage === soals.length) {
      return;
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    console.log("Answer", answer)
  }, [answer])

  const nextQuestion = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevQuestion = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleSubmitAnswer = () => {
    console.log("Submited", answer)
  }

  return (
    <>
      <Navbar
        logo=".ET"
        countdown="02:00:00"
        username="John"
        image={Images}
      />
      <div className='flex justify-center mt-10 ml-9'>
        <div className="card-soal border-2 border-primary px-5 py-5">
          <Card
            soals={currentSoals}
            onAnswer={handleAllAnswer}
            answer={answer}
          />
          <div className='mt-64 flex justify-between'>
            <button  className='bg-primary p-2 rounded-md text-white'>
              <a onClick={() => prevQuestion} href="/#">Kembali</a>
            </button>
            {
              currentPage === soals.length ?
              <button className='bg-primary p-2 rounded-md text-white'>
                <a onClick={() => handleSubmitAnswer} href="/#">Selesai</a>
              </button>
              : 
              <button onClick={() => nextQuestion} className='bg-primary p-2 rounded-md text-white'>
                <a onClick={() => prevQuestion} href="/#">Selanjutnya</a>
              </button>
            }
          </div>
        </div>
        <Daftar
          soalsPerPage={soalsPerPage}
          totalSoals={soals.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default Soal