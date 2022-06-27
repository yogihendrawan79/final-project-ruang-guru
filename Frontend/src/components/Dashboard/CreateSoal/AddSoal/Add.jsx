import axios from "axios";
import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function Add() {
  const [question, setQuestion] = useState()
  const [opsiA, setOpsiA] = useState()
  const [opsiB, setOpsiB] = useState()
  const [opsiC, setOpsiC] = useState()
  const [opsiD, setOpsiD] = useState()
  const [answer, setAnswer] = useState()

  const currentUrl = window.location.href
  const arrCurrentUrl = currentUrl.split('/')
  const numCurrentUrl = parseInt(arrCurrentUrl[5])
  const idmapel = numCurrentUrl
  
  const MySwal = withReactContent(Swal)

  const newSoal = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/guru/create/soal', {
        "id_mata_pelajaran" : idmapel,
        "pertanyaan" : question,
        "kunci_jawaban" : answer,
        "opsi_jawaban" : {
              "opsi_a" : opsiA,
              "opsi_b" : opsiB,
              "opsi_c" : opsiC,
              "opsi_d" : opsiD
            }
      }, 
        {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
        }
      )
      MySwal.fire({
        title: 'Berhasil Menambahkan Soal',
        icon: 'success',
      })
      console.log('Berhasil membuat soal', res)
    } catch (error) {
      console.log("Gagal membuat soal", error)
    }
  }

  

  return (
    <>
      <div className="flex-1 justify-center mx-5 my-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="p-4">
            <form onSubmit={newSoal}>
              <div class="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Pertanyaan
                </label>
                <textarea
                  type="text"
                  id="message"
                  onChange={(e) => setQuestion(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tulis Pertanyaan..."
                  required
                />
              </div>
              <div class="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    for="a_answer"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Opsi A
                  </label>
                  <input
                    onChange={(e) => setOpsiA(e.target.value)}
                    type="text"
                    id="a_answer"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Opsi A"
                    required
                  />
                </div>
                <div>
                  <label
                    for="b_answer"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Opsi B
                  </label>
                  <input
                    onChange={(e) => setOpsiB(e.target.value)}
                    type="text"
                    id="b_answer"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Opsi B"
                    required
                  />
                </div>
                <div>
                  <label
                    for="c_answer"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Opsi C
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setOpsiC(e.target.value)}
                    id="c_answer"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Opsi C"
                    required
                  />
                </div>
                <div>
                  <label
                    for="d_answer"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Opsi D
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setOpsiD(e.target.value)}
                    id="d_answer"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Opsi D"
                    required
                  />
                </div>
              </div>
              <div class="mb-6">
                <label
                  for="kunjaw"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Kunci Jawaban
                </label>
                <input
                  type="text"
                  onChange={(e) => setAnswer(e.target.value)}
                  id="kunjaw"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kunci Jawaban"
                  required
                />
              </div>
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-5"
              >
                Add
              </button>
              <button
                type="reset"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add;
