import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Tostify from '../components/Tostify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = () => {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate()

  const handleInput = (e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }

  const tostify_msg = (type, message) => {
    Tostify(type, message);
  }

  const validateData = ()=>{
    if(data.username === '' || data.email === '' || data.password === ''){
      if(data.username === ''){
        tostify_msg("error", "Please Provide Your Username!")
      }
      if(data.email === ''){
        tostify_msg("error", "Please Provide Your Email!")
      }
      if(data.password === ''){
        tostify_msg("error", "Please Provide Your Password!")
      }
      return false
    }
    else if(data.password.length<8){
      tostify_msg("error", "Password should be atleast 8 character long!")
      return false
    }
    return true
  }

  const registerUser = async (e)=>{
    e.preventDefault()
    let validated = validateData()

    if (validated){
      const URL = 'http://127.0.0.1:8000/api/register-user/'
      try{
        const response = await axios.post(URL, data, {
          headers:{
            'Content-Type': 'application/json'
          }
        });

        if(response.status === 201){
          tostify_msg("success", "You are successfully Registered. \n You can Login now.")
          setData({username:'', email:'', password:''})
          setTimeout(() => {
            navigate('/')
          }, 2000);

        }

      }
      catch(error){
        if (error.response) {
          console.log('Error registering user.');
          console.log(error.response.data);

        } else {
          tostify_msg('error','Network error. Please try again later.');
      }
      }

    }

  }
  


  return (
    <div className='flex justify-center items-center h-screen bg-slate-100'>
      <div className='w-96 p-8 shadow-lg bg-neutral-700 rounded-md'>
        <h1 className='text-center font-bold text-3xl text-white'>Register</h1>
        <form onSubmit={registerUser}>
        <div className='mt-2'>
          <label htmlFor='username' className='block text-lg mb-2 text-white'>Username</label>
          <input type='text' name='username' id='username' value={data.username} className='rounded-lg p-2 focus:outline-none focus:ring-0 focus:border-gray-400 w-full shadow-md' onChange={handleInput}/>
        </div>

        <div className='mt-2'>
          <label htmlFor='email' className='block text-lg mb-2 text-white'>Email</label>
          <input type='email'name='email' id='email' value={data.email} className='rounded-lg p-2 focus:outline-none focus:ring-0 focus:border-gray-400 w-full shadow-md' onChange={handleInput}/>
        </div>

        <div className='mt-3'>
          <label htmlFor='password' className='block text-lg mb-2 text-white'>Password</label>
          <input type='password' name='password' id='password' value={data.password} className='rounded-lg p-2 focus:outline-none focus:ring-0 focus:border-gray-400 w-full shadow-md' onChange={handleInput}/>
        </div>

        <div className='mt-4'>
          <button className='w-full rounded-lg bg-blue-600 text-white text-xl font-bold p-1 hover:bg-blue-500 ease-in-out transition duration-200' type='submit'>Register</button>
        </div>
        </form>
        <p className='m-2 text-center mt-3'><span className=' text-white'>Already have account?<Link to='/login' className='ml-2 text-blue-500'>Sign in</Link></span></p>



      </div>

      <ToastContainer />

    </div>
  )
}

export default Register