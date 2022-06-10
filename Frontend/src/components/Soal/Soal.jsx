import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Card from './CardSoal/Card'
import Daftar from './DaftarSoal/Daftar'


function Soal() {
  const [soals, setSoals] = useState([]);
  const [currentPage, setCurrentPage] = useState(false)
  const [soalsPerPage] = useState(1)

  const data = [
    {
      image: "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzl8fHN0dWRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      countdown: "02:00:00",
      username: "John"
    }
  ]

  useEffect(() => {
    const fetchSoals = async () => {
      const res = await axios.get('http://localhost:8000/soal')
      setSoals(res.data)
    }

    fetchSoals();
  }, [])
  // console.log("Hasil fetch", soals)

  // Get current soal
  const indexOfLastSoal = currentPage * soalsPerPage;
  const indexOfFirstSoal = indexOfLastSoal - soalsPerPage;
  const currentSoals = soals.slice(indexOfFirstSoal, indexOfLastSoal)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
     {
       data.map((index) => (
        <Navbar key={index.username} logo=".ET" countdown={index.countdown} username={index.username} image={index.image} />
       ))
     }
     <div className='flex justify-center mt-10'>
      <Card soals={currentSoals} />
      <Daftar
        soalsPerPage={soalsPerPage}
        totalSoals={soals.length}
        paginate={paginate}
      />
     </div>
    </>
  )
}

export default Soal