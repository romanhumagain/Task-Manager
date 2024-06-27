import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const { loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-slate-100'>
        <div className='w-96 p-10 shadow-lg bg-slate-300 rounded-md'>
          <h1 className='text-center font-bold text-3xl text-black'>Login</h1>
          <form onSubmit={loginUser}>
            <div className='mt-2'>
              <label htmlFor='username' className='block text-lg mb-2 text-gray-800'>Username</label>
              <input type='text' id='username' className='rounded-lg p-2 focus:outline-none focus:ring-0 focus:border-gray-400 w-full shadow-md'></input>
            </div>
            <div className='mt-3'>
              <label htmlFor='password' className='block text-lg mb-2  text-gray-800'>Password</label>
              <input type='password' id='password' className='rounded-lg p-2 focus:outline-none focus:ring-0 focus:border-gray-400 w-full shadow-md'></input>
            </div>

            <div className='mt-4'>
              <button className='w-full rounded-lg bg-blue-600 text-white text-xl font-bold p-1 hover:bg-blue-500 ease-in-out transition duration-200' type='submit'>Login</button>
            </div>
            <div className='mt-2'>
              <button className='w-full rounded-lg bg-slate-600 text-white p-2 text-md font-semibold hover:bg-slate-700'><FcGoogle className='text-3xl inline' /> Sign in with Google</button>
            </div>
            <p className='m-2 text-center mt-3'><span className='text-gray-800'>Create a new account?<Link to='/register' className='ml-2 text-blue-500'>Register</Link></span></p>
          </form>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default Login;
