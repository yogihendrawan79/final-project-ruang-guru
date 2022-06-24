import React, { useState } from "react";
import axios from "axios";

function NewForm() {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [kkm, setKkm] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mataPelajaran, setMataPelajaran] = useState("");
  const [submit, setSubmit] = useState({});
  const [token, setToken] = useState()

  const handleInputDate = (e) => {
    setDate(e.target.value);
  };

  const handleInputTime = (e) => {
    setTime(e.target.value);
  };
  const timeDate = `${date} ${time}`;
  console.log(timeDate);

  const kkmInt = parseInt(kkm)
  console.log("Integer ", kkmInt)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/guru/create/ujian",
        {
          id_mata_pelajaran: 3,
          kkm: kkmInt,
          durasi: duration,
          deadline: timeDate,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      
      const resToken = res.data
      setToken(resToken)
      console.log("Respon Create Soal", resToken);
    } catch (err) {
      console.log("Gagal post data", err);
    }
  };

  console.log("KKM", typeof(kkm));
  console.log("durasi", typeof(duration));
  console.log("deadline", typeof(timeDate));
  console.log("TOken", token.data.token_ujian)

  return (
    <>
      <div className="flex-1 justify-center mx-5 my-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div class="mb-6">
                <label
                  for="id_mata_pelajaran"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Mata Pelajaran
                </label>
                <input
                  type="text"
                  id="id_mata_pelajaran"
                  name="id_mata_pelajaran"
                  // value={submit.id_mata_pelajaran || ""}
                  onChange={(e) => setMataPelajaran(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi dengan nama Mata Pelajaran"
                  required
                />
              </div>
              <div class="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    for="kkm"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    KKM
                  </label>
                  <input
                    type="number"
                    id="kkm"
                    name="kkm"
                    // value={submit.kkm || ""}
                    onChange={(e) => setKkm(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nilai KKM"
                    required
                  />
                </div>
                <div>
                  <label
                    for="durasi"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Durasi
                  </label>
                  <input
                    type="number"
                    id="durasi"
                    name="durasi"
                    // value={submit.durasi || ""}
                    onChange={(e) => setDuration(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Durasi Pengerjaan"
                    required
                  />
                </div>
                <div>
                  <label
                    for="deadline_date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Deadline Date
                  </label>
                  <input
                    type="date"
                    id="deadline_date"
                    onChange={handleInputDate}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    for="deadline_time"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Deadline Time
                  </label>
                  <input
                    type="time"
                    id="deadline_time"
                    onChange={handleInputTime}
                    step="1"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                class="text-white border border-gray-300 bg-blue-700 hover:bg-blue-800 text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium block w-full p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
              >
                Create Ujian
              </button>
            </form>
            {/* show token to guru */}
            <div className="flex justify-center border border-gray-50 ">
              Token : {token.data.token_ujian}
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div class="p-4">
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div class="relative mt-1">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  />
                  <div className="absolute top-0 right-0">
                    <div className="flex justify-end">
                      <a
                        href="/#"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
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
                        <span class="ml-3">Add Questions</span>
                      </a>
                      <a
                        href="/#"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <svg
                          class="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                          <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                        </svg>
                        <span class="ml-3">Publish</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
                    <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4">1</td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      Kemerdekaan Indonesia jatuh pada Tahun?
                    </th>
                    <td class="px-6 py-4">B</td>
                    <td class="px-6 py-4">1965</td>
                    <td class="px-6 py-4">1945</td>
                    <td class="px-6 py-4">1998</td>
                    <td class="px-6 py-4">2001</td>
                    <td class="px-6 py-4 text-right">
                      <a
                        href="/#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewForm;
