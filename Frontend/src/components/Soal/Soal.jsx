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
  return (
    <>
     {
       data.map((index) => (
         <Navbar logo=".ET" countdown={index.countdown} username={index.username} image={index.image} />
       ))
     }
     <div className='flex justify-center mt-10 mr-24'>
       <Card />
       <Daftar />
     </div>
    </>
  )
}

export default Soal