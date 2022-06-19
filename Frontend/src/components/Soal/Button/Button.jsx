import React from 'react'

function Button({ button, onClick }) {
  return (
    <>
      <div className='flex justify-between'>
       <a href='#/' onClick={onClick} className='hover:bg-primary border border-solid text-primary border-primary p-1 w-28 text-center rounded-2xl hover:text-white'>{button}</a> 
      </div>
    </>
  )
}

export default Button