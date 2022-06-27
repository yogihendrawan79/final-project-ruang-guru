import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import NavbarToken from "../Navbar/NavbarToken";
import logo from "../../assets/logo.png";
import control from "../../assets/control.png";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Sidebar() {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState()
  const [username, setUsername] = useState()

  const navigate = useNavigate 
  
  const MySwal = withReactContent(Swal)

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/profile', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      setImage(res.data.data.avatar)
      setUsername(res.data.data.nama)
      console.log("avatar", res.data.data.avatar)
      console.log("nama", res.data.data.nama)

    } catch (error) {
      console.log("gagal fetch data", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = () => {
    MySwal.fire({
      title: 'Log Out Berhasil',
      icon: 'success',
    })
    localStorage.clear()
    navigate('/login')
  }

  const handleEndSession =async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:8080/api/guru/kill-ujian', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log('Berhasil Kill ujian', res)

      MySwal.fire({
        title: 'Sesi Ujian Berakhir',
        icon: 'success',
      })
    } catch (error) {
      MySwal.fire({
        title: 'Gagal Mengakiri Sesi Ujian',
        icon: 'error',
      })
      console.log("Tidak berhasil end session", error)
    }
  }

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img 
          alt=""
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            alt=""
            src={logo}
            style={{ width: "50px" }}
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Exam Time
          </h1>
        </div>
        <ul className="mt-5">
          <li className="flex mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4">
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>
              <Link to={"/guru/bank-soal"}>Bank Soal</Link>
            </span>
          </li>
          <li className="flex mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4">
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>
              <Link to={"/guru/create-soal"}>Create Soal</Link>
            </span>
          </li>
          <li className="flex mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4">
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>
              <Link to={"/guru/report-ujian"}>Report Ujian</Link>
            </span>
          </li>
          <li className="flex mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4">
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>
              <Link to={"/guru/create-ujian"}>Create Ujian</Link>
            </span>
          </li>
          <li>
            <button 
              className="hover:bg-orange-400 border border-orange-400 mt-8 rounded-md py-1 px-4 ml-3"
              onClick={handleEndSession}>
              <a href="#/" className="text-white">Akhiri Ujian</a>
            </button>
          </li>
          <li>
            <button className="bg-red-700 mt-4 rounded-md py-1 px-4 ml-3" onClick={handleLogout}>
              <a href="/login" className="text-white">Log Out</a>
            </button>
          </li>
        </ul>
      </div>
      <div className="h-screen flex-1">

        <NavbarToken
          username={username}
          image={image}
        />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Sidebar;
