import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="flex  bg-zinc-800 text-white py-3">
        <div className="logo mx-8 text-2xl font-bold cursor-pointer hover:shadow-slate-300">
          <Link to={'/todo'}><span className='text-red-500'>i</span>Task</Link>
        </div>
        <div className="logo mx-3 text-2xl font-bold cursor-pointer hover:shadow-slate-300">
        <Link to={'/notes'}><span className='text-red-500'>i</span>Notes</Link>
        </div>

        <div className="logo mx-3 text-2xl font-bold cursor-pointer hover:shadow-slate-300">
          <span className='text-red-500'>i</span>Expenses
        </div>

        <ul className='flex gap-9 mx-20 my-1 ml-auto '>
          <li className='cursor-pointer  hover:shadow-sm hover:text-red-400 hover:scale-110 ease-in-out transition duration-300 text-xl'>Logout</li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar