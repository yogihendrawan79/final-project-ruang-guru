import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Card({ mapel, idmapel }) {
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/guru/create/ujian",
        { id_mata_pelajaran: idmapel },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Response report", res);
    } catch (err) {
      console.log("Gagal fetch data", err);
    }
  };

  return (
    <>
      <div className="flex justify-start ml-20 mt-10">
        <Link
          to={`/guru/create-ujian/${idmapel}`}
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
