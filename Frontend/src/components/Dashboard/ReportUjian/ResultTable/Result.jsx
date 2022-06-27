import React, { useState, useEffect } from "react";
import axios from "axios";
import "./result.css";

function Result() {
  const url = "http://localhost:8080/api/guru/report";

  const [data, setData] = useState([]);

  const currentUrl = window.location.href;
  const arrCurrentUrl = currentUrl.split("/");
  const numCurrentUrl = parseInt(arrCurrentUrl[5]);
  const idmapel = numCurrentUrl;

  useEffect(() => {
    const idMapel = { id_mata_pelajaran: idmapel };
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios.post(url, idMapel, { headers }).then((json) => setData(json.data));
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
