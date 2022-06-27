import React, { useEffect, useState } from "react";
import Card from "./CardBank/Card";
import axios from "axios";

const BankSoal = () => {
  const [mapel, setMapel] = useState();

  const fetchMapel = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/guru/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const mataPelajaran = res.data.data;
      console.log("Berhasil fetch data", mataPelajaran);

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
                  mapel={mapel.mata_pelajaran}
                  id_mapel={mapel.id_mata_pelajaran}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BankSoal;
