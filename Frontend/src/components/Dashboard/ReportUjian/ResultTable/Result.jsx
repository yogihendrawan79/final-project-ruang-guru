import React from "react";

function Result() {
  // const

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
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">1</td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  John Doe
                </th>
                <td class="px-6 py-4">Matematika</td>
                <td class="px-6 py-4">10</td>
                <td class="px-6 py-4">Tidak Lulus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Result;
