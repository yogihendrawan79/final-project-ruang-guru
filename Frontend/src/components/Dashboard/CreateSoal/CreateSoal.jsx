import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Cards/Card";
import { Link } from "react-router-dom";

function CreateSoal() {
  const [mapel, setMapel] = useState();

  const fetchMapel = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/guru/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

<<<<<<< HEAD
      console.log("response report ujian", res);
      const mataPelajaran = res.data.data.mapel_detail;
=======
      const mataPelajaran = res.data.data;
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d

      setMapel(mataPelajaran);
    } catch (error) {
      console.log("Gagal fetch data mapel", error);
    }
  };

  useEffect(() => {
    fetchMapel();
  }, []);
<<<<<<< HEAD
=======

  const currentUrl = window.location.href;
  const urlArr = currentUrl.split("/");
  console.log("Current url", urlArr);
  const idMapel = urlArr[5];

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/guru/create-soal",
        { id_mata_pelajaran: idMapel },
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
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d

  return (
    <>
      <div className="flex justify-start">
        <div className="grid grid-cols-5 mr-5">
          {mapel &&
            mapel.map((mapel) => {
              return (
<<<<<<< HEAD
                <Card
                  key={mapel.id_mata_pelajaran}
                  mapel={mapel.mata_pelajaran}
                  idmapel={mapel.id_mata_pelajaran}
                />
=======
                <div className="flex justify-start ml-20 mt-10">
                  <Link
                    to={`/guru/create-soal/${mapel.id_mata_pelajaran}`}
                    onClick={handleClick}
                    class="block p-6 w-52 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                      {mapel.mata_pelajaran}
                    </h5>
                  </Link>
                </div>
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d
              );
            })}
        </div>
      </div>
    </>
  );
}

export default CreateSoal;
