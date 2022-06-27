import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

function Card({ mapel, id_mapel }) {
  // /api/guru/bank-soal
  //tambahain id_mapel ke body ketika melakukan hit post api

  console.log("idmapel", id_mapel)

  const handleClick = () => {
    try {
      const res = axios.post ('/api/guru/bank-soal', {id_mata_pelajaran: id_mapel},
      {
        headers : {
          'Authorization' : 'Bearer' + localStorage.getItem('token')
        }
      })
      console.log("Respon KLIK MAPEL", res)
    } catch(error) {
      console.log('Gagal')
    }
  }

  return (
    <>
      <div className="flex justify-start ml-20 mt-10">
        <Link
          to={`/guru/bank-soal/${id_mapel}`}
          onClick={handleClick}
          class="block p-6 w-52 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
            {mapel}
          </h5>
        </Link>
      </div>
    </>
  );
}

export default Card;
