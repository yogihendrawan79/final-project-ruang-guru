import React, { useState, useEffect } from "react";
import axios from "axios";
import "./bank.css";
import { Link } from 'react-router-dom'

function Bank() {
  const [dataBank, setDataBank] = useState([]);

  const currentUrl = window.location.href;
  const arrCurrentUrl = currentUrl.split("/");
  const numCurrentUrl = parseInt(arrCurrentUrl[5]);
  const idmapel = numCurrentUrl;

  const showDataBank = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/guru/bank-soal",
        {
          id_mata_pelajaran: idmapel,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const bankData = res.data.data;
      console.log("Data bank", bankData);
      setDataBank(bankData);
    } catch (error) {
      console.log("Gagal mengambil data bank soal", error);
    }
  };

  useEffect(() => {
    showDataBank();
  }, []);



  const renderTable = () => {
    return dataBank.map((dBank) => {
      return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="counterCell px-6 py-4"></td>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {dBank.pertanyaan}
          </th>
          <td class="px-6 py-4">{dBank.kunci_jawaban}</td>
          <td class="px-6 py-4">{dBank.opsi.opsi_a}</td>
          <td class="px-6 py-4">{dBank.opsi.opsi_b}</td>
          <td class="px-6 py-4">{dBank.opsi.opsi_c}</td>
          <td class="px-6 py-4">{dBank.opsi.opsi_d}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="flex-1 justify-center mx-5 my-5">
        <div className="flex button bg-green-400 py-2 px-5 rounded-md w-max">
          <Link className=" text-white text-center" to={`/guru/create-ujian/${idmapel}`}>Create Ujian</Link>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No
                </th>
                <th scope="col" class="px-6 py-3">
                  Pertanyaan
                </th>
                <th scope="col" class="px-6 py-3">
                  Kunci Jawaban
                </th>
                <th scope="col" class="px-6 py-3">
                  A
                </th>
                <th scope="col" class="px-6 py-3">
                  B
                </th>
                <th scope="col" class="px-6 py-3">
                  C
                </th>
                <th scope="col" class="px-6 py-3">
                  D
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

export default Bank;
