import React from "react";

function Bank() {
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
