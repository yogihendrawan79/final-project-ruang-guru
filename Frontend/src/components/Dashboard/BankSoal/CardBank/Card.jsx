import React from "react";

function Card({ mapel }) {
  return (
    <>
      <div className="flex justify-start ml-20 mt-10">
        <a
          href="/#"
          class="block p-6 w-52 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
            {mapel}
          </h5>
        </a>
      </div>
    </>
  );
}

export default Card;
