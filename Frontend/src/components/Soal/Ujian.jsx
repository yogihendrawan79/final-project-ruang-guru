import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Card from './CardSoal/Card'
import Daftar from './DaftarSoal/Daftar'
import { useNavigate } from 'react-router-dom'

const Ujian = () => {
  const [soals, setSoals] = useState([]);
  const [currentPage, setCurrentPage] = useState(false)
  const [soalsPerPage] = useState(1)
  const [answer, setAnswer] = useState({})
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [duration, setDuration] = useState(0)

  const navigate = useNavigate();

  const fetchSoals = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/siswa/soal', {
        token: sessionStorage.getItem('token_ujian')
      },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      setDuration(res.data.data.durasi)
      setSoals(res.data.data.soal)
      
      // console.log("Respon", res.data)
      // console.log("fetch data soal", res.data.data.soal)
    } catch (error) {
      console.log("Gagal fetch data", error)
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchSoals()
  }, [])

  console.log("Soal", soals)
  // console.log("Durasi", duration)

  // Get current soal
  const indexOfLastSoal = currentPage * soalsPerPage;
  const indexOfFirstSoal = indexOfLastSoal - soalsPerPage;
  const currentSoals = soals.slice(indexOfFirstSoal, indexOfLastSoal)

  // console.log("Current Soal", currentSoals)

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
    if (currentPage === soals.length) {
      return;
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevQuestion = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSubmitAnswer = () => {
    let answers = [];
    for (let key in answer) {
      answers.push({ id_soal: key, answer: answer[key] })
    }

    console.log("Submit Jawaban : ", answers)
  }

  const fetchNavbar = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/siswa/home', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      setImage(res.data.data.avatar)
      setName(res.data.data.nama)
      // console.log("Respon Token", res.data.data)
    } catch (err) {
      console.log("Gagal fetch data ", err)
    }
  }

  useEffect(() => {
    fetchNavbar()
  })

  return (
    <>
      <Navbar
        logo=".ET"
        countdown={duration}
        username={name}
        image={image}
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
              <a onClick={prevQuestion} href="/#">Kembali</a>
            </button>
            {
              currentPage === soals.length ?
              <button className='bg-primary p-2 rounded-md text-white'>
                <a onClick={handleSubmitAnswer} href="/#">Selesai</a>
              </button>
              : 
              <button  className='bg-primary p-2 rounded-md text-white'>
                <a onClick={nextQuestion} href="/#">Selanjutnya</a>
              </button>
            }
          </div>
        </div>
        <Daftar
          soalsPerPage={soalsPerPage}
          totalSoals={soals.length}
          paginate={paginate}
          currentPage={currentPage}
          answer={answer}
        />
      </div>
    </>
  )
}

export default Ujian