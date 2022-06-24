import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavbarToken from '../Navbar/NavbarToken'
import { useNavigate } from 'react-router-dom'
import './token.css'

const Token = () => {
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [token, setToken] = useState()

  const navigate = useNavigate()

  const fetchTokenPage = async () => {
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
    fetchTokenPage()
  }, [])

  const handleProcessToken = async (e) => {
    e.preventDefault();
    // console.log({token})
    
    try {
      const res = await axios.post('http://localhost:8080/api/siswa/token', {token: token}, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })

      // if (res === "Unauthorized") {
      //   navigate('/login')
      // } else {
        sessionStorage.setItem("token_ujian", token)
        navigate('/')
        console.log("Response Token", res.data)
      // }

    } catch (err) {
      alert("Token yang anda masukan salah")
      console.log("gagal fetch soal ", err)
    }
  }

  const handleInput = (e) => {
    setToken(e.target.value)
  }

  return (
    <div className="flex flex-col justify-center text-center">
      <NavbarToken logo=".ET" username={name} image={image} />
      <div className="p-10 token">

        <form onSubmit={handleProcessToken} className=" max-w-xl mx-auto p-12 bg-white shadow-xl rounded-lg">
          <h2 className="font-medium text-3xl">Masukan Token</h2>
          <div className="">
            <p>Silahkan masukan token yang anda terima dari guru anda</p>
          </div>
          <div className="mt-10">
            <input onChange={handleInput} className="border border-primary p-2 w-70 rounded-full w-full" type="text" placeholder="contoh: EXJFKDFGDNB232VFV" />
          </div>
          <div>
            <button
              className="mt-5 hover:bg-primary border border-solid text-primary border-primary p-1 w-28 text-center rounded-2xl hover:text-white"
              onChange={handleInput}
            >
              Proses
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Token