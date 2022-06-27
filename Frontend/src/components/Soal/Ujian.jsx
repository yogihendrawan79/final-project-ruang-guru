import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Card from './CardSoal/Card'
import Daftar from './DaftarSoal/Daftar'
import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import './ujian.css'
=======
import { useTimer } from "react-timer-hook";
import './ujian.css'
import useStore from '../../store/Answer'
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d

const Ujian = () => {
  const [soals, setSoals] = useState([]);
  const [currentPage, setCurrentPage] = useState(false)
  const [soalsPerPage] = useState(1)
  const [answer, setAnswer] = useState({})
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [duration, setDuration] = useState(0)
  const [mapel, setMapel] = useState()
<<<<<<< HEAD
=======
  const [idMapel, setIdMapel] = useState()
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d

  const navigate = useNavigate();
  // const { postAnswer } = useStore()

  const token = sessionStorage.getItem('token_ujian')
  const fetchSoals = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/siswa/soal', {
        token: token
      },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

<<<<<<< HEAD
      const resSoal = res.data.data.soal
      console.log("ResSoal", resSoal)
      setMapel(res.data.data.mapel)
      setSoals(resSoal)
=======
      const resSoal = res.data.data
      // console.log("ResSoal", resSoal)
      // console.log("ResSoals", resSoal.soal)
      setMapel(resSoal.mapel)
      setIdMapel(resSoal.id_mapel)
      setSoals(resSoal.soal)
<<<<<<< HEAD
      setDuration(resSoal.durasi)
=======
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
      setDuration(res.data.data.durasi)
>>>>>>> fa8d9587085d41d0c0d64d9ef2d4c44d1eb06e60

    } catch (error) {
      console.log("Gagal fetch data", error)
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchSoals()
  }, [])

<<<<<<< HEAD
  localStorage.setItem('id_mapel', idMapel)
=======
<<<<<<< HEAD
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
=======
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
>>>>>>> fa8d9587085d41d0c0d64d9ef2d4c44d1eb06e60

  // Get current soal
  const indexOfLastSoal = currentPage * soalsPerPage;
  const indexOfFirstSoal = indexOfLastSoal - soalsPerPage;
  const currentSoals = soals.slice(indexOfFirstSoal, indexOfLastSoal)


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

<<<<<<< HEAD
  
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

=======
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
  }

  const handleSubmitAnswer = async () => {
    const arrAnswer = []
    arrAnswer.push(answer)
    try {
      const res = await axios.post('http://localhost:8080/api/siswa/finish-ujian',
        {
          id_mata_pelajaran: idMapel,
          jawabans: arrAnswer
        },
        {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
        }
<<<<<<< HEAD
      })
      setImage(res.data.data.avatar)
      setName(res.data.data.nama)
    } catch (err) {
      console.log("Gagal fetch data ", err)
=======
      )
      if (res.status === 200) {
        localStorage.setItem('jawabans', JSON.stringify(arrAnswer))
        navigate('/hasil-ujian')
        // console.log('Berhasil submit jawaban', arrAnswer)
      }

    } catch (error) {
      console.log("Gagal submit jawaban", error)
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
    }
  }

  // console.log("Durasi", duration)
  // const intDurasi = parseInt(duration)

  // console.log("Durasi", typeof(durasi))
  // console.log("DUration", duration)
  // console.log("durasi", typeof(durasi))
  // console.log("nilaidurasi", durasi)
  const durasi  = 120
  const MINUTES = durasi*60
  const time = new Date()
  time.setSeconds(time.getSeconds() + MINUTES)

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: time,
    onExpire: () => setCurrentPage(soals.length - 1)
  })

  const timer = `${hours}:${minutes}:${seconds}`

  //Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/profile', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })

      const resProfile = res.data.data
        setImage(resProfile.avatar)
        setName(resProfile.nama)
     
      // console.log("Respon Token", res.data.data)
    } catch (err) {
      console.log("Gagal fetch data profile ", err)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <>
      <Navbar
        logo=".ET"
<<<<<<< HEAD
        // countdown={durasiUjian}
=======
        countdown={timer}
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
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