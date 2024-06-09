import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="flex  bg-zinc-800 text-white py-3">
        <div className="logo mx-8 text-2xl font-bold cursor-pointer hover:shadow-slate-300">
          <span className='text-red-500'>i</span>Task
        </div>
        <div className="logo mx-3 text-2xl font-bold cursor-pointer hover:shadow-slate-300">
          <span className='text-red-500'>i</span>Notes
        </div>
        <ul className='flex gap-9 mx-20 my-1 ml-auto '>
          <li className='cursor-pointer hover:font-bold hover:shadow-sm hover:text-red-400 transition duration-300'>Home</li>
          <li className='cursor-pointer hover:font-bold hover:shadow-sm hover:text-red-400 transition duration-300'>My Todo</li>
          <li className='cursor-pointer hover:font-bold hover:shadow-sm hover:text-red-400 transition duration-300'>My Notes</li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar