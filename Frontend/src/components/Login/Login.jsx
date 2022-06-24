import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarLogo from '../Navbar/NavbarLogo'
import './login.css'
import axios from 'axios'
import loginimage from '../../assets/loginpage.png'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log({ email, password })

    
    try {
      const res = await axios.post('/login', {email: email, password: password}, 
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )
      localStorage.setItem('token', res.data.data.token)

      if(res.data.data.role === "guru") {
        navigate('/guru/bank-soal')
      } else {
        navigate('/token')
      }

    } catch (err) {
      alert("email atau password salah")
      console.log("Gagal Login", err)
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="bg-primary w-full h-full login">
      <NavbarLogo logo=".ET" />
      <div className="grid grid-cols-2 ">
        <div className='sm:block max-w-[1240px] mx-auto'>
          <img className="mt-40 object-cover h-48 w-97 pt-98" src={loginimage} alt='' />
        </div>

        <div className='flex flex-col justify-center px-auto mt-20'>
          <form className="border-2 border-gray-600 max-w-sm mx-auto p-12 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center">Masuk</h2>
            <div className="flex flex-col text-black-300 py-2">
              <label>E-mail</label>
              <input className="border-2 border-violet-600 p-2 w-full rounded-full" type="text" onChange={handleEmail} />
            </div>
            <div className="flex flex-col text-black-300 py-2">
              <label>Kata Sandi</label>
              <input className="border-2 border-violet-600 p-2 w-full rounded-full" type="password" onChange={handlePassword} />
            </div>
            <button className="hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 align-content-center mt-5 w-full bg-blue-500 text-white p-2 rounded-full">Masuk</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login