import React from 'react'

function Button({ button }) {
  return (
    <>
      <div className='flex justify-between'>
       <a href='!#' className='hover:bg-primary border border-solid text-primary border-primary p-1 w-28 text-center rounded-2xl hover:text-white'>{button}</a> 
       {/* <a href='!#' className='bg-primary p-1 w-28 text-center rounded-2xl text-white'>Ragu-ragu</a> 
       <a href='!#' className='bg-primary p-1 w-28 text-center rounded-2xl text-white'>Selanjutnya</a>  */}
      </div>
    </>
  )
}

export default Button