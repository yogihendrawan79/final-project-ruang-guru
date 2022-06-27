import React, { useState, useEffect } from "react";
import axios from "axios";
import "./result.css";

function Result() {
  const [data, setData] = useState([]);

  const currentUrl = window.location.href;
  const arrCurrentUrl = currentUrl.split("/");
  const numCurrentUrl = parseInt(arrCurrentUrl[5]);
  const idmapel = numCurrentUrl;

  const showDataReport = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/guru/report",
        {
          id_mata_pelajaran: idmapel,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const reportData = res.data.data;
      console.log("Data bank", reportData);
      setData(reportData);
    } catch (error) {
      console.log("Gagal mengambil data bank soal", error);
    }
  };

  useEffect(() => {
    showDataReport();
  }, []);

  const renderTable = () => {
    return data.map((report) => {
      return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="counterCell px-6 py-4"></td>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {report.nama}
          </th>
          <td class="px-6 py-4">{report.mata_pelajaran}</td>
          <td class="px-6 py-4">{report.nilai}</td>
          <td class="px-6 py-4">{report.status}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="flex-1 justify-center mx-5 my-5">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No
                </th>
                <th scope="col" class="px-6 py-3">
                  Nama Peserta Didik
                </th>
                <th scope="col" class="px-6 py-3">
                  Mata Pelajaran
                </th>
                <th scope="col" class="px-6 py-3">
                  Nilai
                </th>
                <th scope="col" class="px-6 py-3">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Result;
