import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Card from './CardSoal/Card'
import Daftar from './DaftarSoal/Daftar'
import { useNavigate } from 'react-router-dom'
import './ujian.css'

const Ujian = () => {
  const [soals, setSoals] = useState([]);
  const [currentPage, setCurrentPage] = useState(false)
  const [soalsPerPage] = useState(1)
  const [answer, setAnswer] = useState({})
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [duration, setDuration] = useState(0)
  const [mapel, setMapel] = useState()

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

      const resSoal = res.data
      console.log("ResSoal", resSoal)
      // setMapel(res.data.data.mapel)
      // setSoals(resSoal)
      // setDuration(res.data.data.durasi)

    } catch (error) {
      console.log("Gagal fetch data", error)
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchSoals()
  }, [])

  //Convert waktu ujian
/*
  const timeConvert = (n) => {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    let seconds = (minutes - rminutes) * 60;
    let rseconds = Math.round(seconds);
    let time = `0${rhours}:${rminutes}:${rseconds}`
    return time
  }

  const durasiUjian = timeConvert(duration)

  //Countdown waktu ujian
  const [countdown, setCountdown] = useState(durasiUjian)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(durasiUjian)
      setDuration(duration - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [duration])
*/

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
    
    setTimeout(() => {
      if (currentPage === soals.length) {
        return;
      } else {
        setCurrentPage(currentPage + 1)
      }
    }, 600)
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
    const answers = []

    soals.map((soal) => {
      if(soal.opsi.opsi_a) {
        answers.push({ id_soal: soal.id_soal, answer: "A" })
      } 

      if (soal.opsi.opsi_b) {
        answers.push({ id_soal: soal.id_soal, answer: "B" })
      }

      if (soal.opsi.opsi_c) {
        answers.push({ id_soal: soal.id_soal, answer: "C" })
      }

      if (soal.opsi.opsi_d) {
        answers.push({ id_soal: soal.id_soal, answer: "D" })
      }

      return answers;
    })

    console.log("Submit Jawaban : ", answers)
  }

  // const fetchNavbar = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:8080/api/siswa/home', {
  //       headers: {
  //         'Authorization': 'Bearer ' + localStorage.getItem('token')
  //       }
  //     })
  //     setImage(res.data.data.avatar)
  //     setName(res.data.data.nama)
  //   } catch (err) {
  //     console.log("Gagal fetch data ", err)
  //   }
  // }

  // useEffect(() => {
  //   fetchNavbar()
  // })

  return (
    <>
      <Navbar
        logo=".ET"
        // countdown={durasiUjian}
        username={name}
        image={image}
      />
      <h1 className='mt-5 mb-1 mapel font-bold'>{mapel}</h1>
      <div className='flex justify-center ml-9'>
        <div className="card-soal border-2 border-primary px-5 py-5 relative">
          <Card
            soals={currentSoals}
            onAnswer={handleAllAnswer}
            answer={answer}
          />
          <div className='mt-36 flex justify-between'>
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