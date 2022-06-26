import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Cards/Card";

function CreateSoal() {
  const [mapel, setMapel] = useState();

  const fetchMapel = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/guru/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log("response report ujian", res);
      const mataPelajaran = res.data.data;

      setMapel(mataPelajaran);
    } catch (error) {
      console.log("Gagal fetch data mapel", error);
    }
  };

  useEffect(() => {
    fetchMapel();
  }, []);

  return (
    <>
      <div className="flex justify-start">
        <div className="grid grid-cols-5 mr-5">
          {mapel &&
            mapel.map((mapel) => {
              return (
                <Card
                  key={mapel.id_mata_pelajaran}
                  mapel={mapel.mata_pelajaran}
                  idmapel={mapel.id_mata_pelajaran}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default CreateSoal;
