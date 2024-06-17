import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  const location = useLocation()
  const pathname = location.pathname

  const isActive = (path) => {
    return pathname?.split('/').pop() === path
  }


  return (
    <>
      <nav className="flex  bg-zinc-800 text-white py-3">
        {user ? (
          <div className='flex'>
            <div className={`logo mx-8 text-xl font-semibold cursor-pointer hover:shadow-slate-300 ${isActive('todo') ? "scale-125 transition duration-500 font-bold text-2xl" : null}`}>
              <Link to={'/todo'}><span className='text-red-500'>i</span>Todo</Link>
            </div>

            <div className={`logo mx-8 text-xl font-semibold cursor-pointer hover:shadow-slate-300 ${isActive('notes') ? "scale-125 transition duration-500 font-bold text-2xl" : null}`}>
              <Link to={'/notes'}><span className='text-red-500'>i</span>Notes</Link>
            </div>

            <div className={`logo mx-8 text-xl font-semibold cursor-pointer hover:shadow-slate-300 ${isActive('expenses') ? "scale-125 transition duration-500 font-bold text-2xl" : null}`}>
              <span className='text-red-500'>i</span>Expenses
            </div>
          </div>
        ) :
          (<div className="logo mx-8 text-2xl font-bold cursor-pointer hover:shadow-slate-300">
            <Link to={'/'}><span className='text-red-500'>i</span>Task</Link>
          </div>)
        }


        <ul className='flex gap-9 mx-20 my-1 ml-auto '>
          {user ? (
            <div className='flex'>
              <li className='flex hover:shadow-sm  text-xl mr-5'><FaUserCircle className='text-2xl mt-1 mr-1' />{user.username}</li>
              <li className='cursor-pointer  hover:shadow-sm hover:text-red-400 hover:scale-110 ease-in-out transition duration-300 text-xl' onClick={logoutUser}>Logout</li>

            </div>
          ) :
            (
              <li className='cursor-pointer  hover:shadow-sm hover:text-red-400 hover:scale-110 ease-in-out transition duration-300 text-xl'><Link to='/login'>Login</Link></li>
            )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar