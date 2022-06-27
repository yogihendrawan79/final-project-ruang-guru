import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Card from './CardSoal/Card'
import Daftar from './DaftarSoal/Daftar'
import { useNavigate } from 'react-router-dom'
import { useTimer } from "react-timer-hook";
import './ujian.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Ujian = () => {
  const [soals, setSoals] = useState([]);
  const [currentPage, setCurrentPage] = useState(false)
  const [soalsPerPage] = useState(1)
  const [answer, setAnswer] = useState({})
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [duration, setDuration] = useState(0)
  const [mapel, setMapel] = useState()
  const [idMapel, setIdMapel] = useState()

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const token = sessionStorage.getItem('token_ujian')
  const fetchSoals = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/siswa/soal', {
        token: token
      },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const resSoal = res.data.data
      // console.log("ResSoal", resSoal)
      // console.log("ResSoals", resSoal.soal)
      setMapel(resSoal.mapel)
      setIdMapel(resSoal.id_mapel)
      setSoals(resSoal.soal)
      setDuration(resSoal.durasi)

    } catch (error) {
      console.log("Gagal fetch data", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchSoals()
  }, [])

  localStorage.setItem('id_mapel', idMapel)

  // Get current soal
  const indexOfLastSoal = currentPage * soalsPerPage;
  const indexOfFirstSoal = indexOfLastSoal - soalsPerPage;
  const currentSoals = soals.slice(indexOfFirstSoal, indexOfLastSoal);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    console.log("Answer", answer);
  }, [answer]);

  const nextQuestion = () => {
    if (currentPage === soals.length) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevQuestion = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAllAnswer = (indexSelected, indexOptionSelected) => {

    let arrAnswer = []
    
    arrAnswer.push({answer: indexOptionSelected, id_soal: indexSelected})
    setAnswer(arrAnswer)

    console.log("AnswerArray", arrAnswer);

    setTimeout(() => {
      if (currentPage === soals.length) {
        return;
      } else {
        setCurrentPage(currentPage + 1);
      }
    }, 600)
  }

  console.log('New All Answer', answer)

  const handleSubmitAnswer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/siswa/finish-ujian",
        {
          id_mata_pelajaran: idMapel,
          jawabans: answer
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )

      let timerInterval
      MySwal.fire({
          title: 'Berhasil Mengumpulkan Jawaban',
          icon: 'success',
          timer: 3000,
          timerProgressBar: false,
          didOpen: () => {
              Swal.showLoading()
          },
          willClose: () => {
              clearInterval(timerInterval)
          }
        }).then((result) => {
          if (res.status === 200) {
            localStorage.setItem('jawabans', JSON.stringify(answer))
            navigate('/hasil-ujian')
          }
        })

        console.log("Submited Answer", answer)

    } catch (error) {
      console.log("Gagal submit jawaban", error)
    }
  } 

  const durasi = 120;
  const MINUTES = durasi * 60;
  const time = new Date();
  time.setSeconds(time.getSeconds() + MINUTES);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: time,
    onExpire: () => setCurrentPage(soals.length - 1),
  });

  const timer = `${hours}:${minutes}:${seconds}`;

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
        countdown={timer}
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
          <div className="mt-36 flex justify-between">
            <button className="bg-primary p-2 rounded-md text-white">
              <a onClick={prevQuestion} href="/#">
                Kembali
              </a>
            </button>
            {currentPage === soals.length ? (
              <button className="bg-primary p-2 rounded-md text-white">
                <a onClick={handleSubmitAnswer} href="/#">
                  Selesai
                </a>
              </button>
            ) : (
              <button className="bg-primary p-2 rounded-md text-white">
                <a onClick={nextQuestion} href="/#">
                  Selanjutnya
                </a>
              </button>
            )}
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
  );
};

export default Ujian;
