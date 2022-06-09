import React from 'react'
import Navbar from '../Navbar/Navbar'
import Card from './CardSoal/Card'
import Daftar from './DaftarSoal/Daftar'


function Soal() {
  const data = [
    {
      image: "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzl8fHN0dWRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      countdown: "20:90",
      username: "John"
    }
  ]

  const soal = [
    {
      id: "1",
      question: "23. Indonesia merdeka pada tahun?",
      option: {
        A: "A. 1945",
        B: "B. 1999",
        C: "C. 1928",
        D: "D. 1960"
      }
    },
    // {
    //   id: "2",
    //   question: "23. Siapakah presiden RI yang pertama?",
    //   option: {
    //     A: "A. Ir. Soekarno",
    //     B: "B. Soeharto",
    //     C: "C. Joko Widodo",
    //     D: "D. Naruto"
    //   }
    // },
  ]

  return (
    <>
     {
       data.map((index) => (
        <Navbar key={index.username} logo=".ET" countdown={index.countdown} username={index.username} image={index.image} />
       ))
     }
     <div className='flex justify-center mt-10'>
      {soal.map((soal) => (
       <Card key={soal.id} soal={soal.question} option={soal.option} />
      ))}
       <Daftar />
     </div>
    </>
  )
}

export default Soal