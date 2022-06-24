import React from "react";

function Bank() {
  // const

  return (
    <>
      <div className="flex-1 justify-center mx-5 my-5">
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Bank;
