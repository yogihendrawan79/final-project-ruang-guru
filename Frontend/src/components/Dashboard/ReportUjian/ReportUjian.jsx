import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./CardReport/Card";

const ReportUjian = () => {
  const [mapel, setMapel] = useState();

  const fetchMapel = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/guru/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log("response report ujian", res);
<<<<<<< HEAD
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
};

export default ReportUjian;
