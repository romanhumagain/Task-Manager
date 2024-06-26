import React, { useState, useEffect, useRef } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { VscPinnedDirty } from "react-icons/vsc";
import { FcTodoList } from "react-icons/fc";
import { TbPinnedOff } from "react-icons/tb";

import { ToastContainer } from 'react-toastify';
import Tostify from '../Tostify';

import { useAuth } from '../../contexts/AuthContext';

const Todo = () => {
  const {authToken, logoutUser} = useAuth()

  const [todo, setTodo] = useState([])
  const [todoText, setTodoText] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [unfinishedCheck, setUnfinishedCheck] = useState(false)


  let inputRef = useRef(null)


  useEffect(() => {
    fetchTodo(unfinishedCheck)

  }, [unfinishedCheck])

  const tostify_msg = (type, message) => {
    Tostify(type, message);
  }

  const createTodo = async () => {
    const data = { todo: todoText };
    const URL = 'http://127.0.0.1:8000/api/todos/';
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const response_data = await response.json();
        fetchTodo();
        setTodoText('');
        tostify_msg('success', 'Successfully Added Todo.');
        setUnfinishedCheck(false);
      } else {
        if (response.status === 401) {
          logoutUser();
        }
        throw Error('Network response was not OK !');
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const fetchTodo = async (is_unfinished_checked) => {
    let URL;

    if (is_unfinished_checked) {
      URL = `http://127.0.0.1:8000/api/todos/?is_completed=${!is_unfinished_checked}`
    }
    else {
      URL = 'http://127.0.0.1:8000/api/todos/'
    }

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        }
      });
      if (response.ok) {
        const data = await response.json()
        setTodo(data)
      }else {
        if (response.status === 401) {
          logoutUser();
        }
        throw Error("Network response was not OK!")
      }
      
    }
    catch (error) {
      console.log("ERROR", error)
    }
  }

  const handleTodo = async (item) => {
    const URL = `http://127.0.0.1:8000/api/todos/${item.id}/`
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
      })
      if (response.ok) {
        const data = await response.json()
        if(data.is_completed){
          tostify_msg("error", "Completed Task cannot be updated !")
        }
        else{
          setTodoText(item.todo)
          setTodoId(item.id)
          setEditMode(true)
          inputRef.current.focus()
        }
      }
      else{
        if (response.status === 401) {
          logoutUser();
        }
      }
    }
    catch (error) {
      console.log("ERROR", error)
    }
  }

  const updateTodo = async () => {
    const URL = `http://127.0.0.1:8000/api/todos/${todoId}/`
    const data = {
      id: todoId,
      todo: todoText
    }
    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        const response_data = await response.json()
        setEditMode(false)
        setTodoId(null)
        setTodoText("")
        fetchTodo()

        tostify_msg("success", "Successfully Updated")

      }
      else {
        if (response.status === 401) {
          logoutUser();
          throw Error("Response was not OK!")
        }
      }
    }
    catch (error) {
      console.log("ERROR", error)
    }
  }

  const updatePinnedTodo = async (item, pinned) => {
    const URL = `http://127.0.0.1:8000/api/todos/${item.id}/`
    const data = {
      id: todoId,
      is_pinned: pinned ? true : false
    }
    try {
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        const response_data = await response.json()
        fetchTodo()

        tostify_msg("success", `Successfully ${pinned ? "Pinned" : "Unpinned"} Your Todo.`)

      }
      else {
        if (response.status === 401) {
          logoutUser();
        }
        throw Error("Response was not OK!")
      }
    }
    catch (error) {
      console.log("ERROR", error)
    }
  }

  const deleteTodo = async (item) => {
    const URL = `http://127.0.0.1:8000/api/todos/${item.id}/`
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
      })
      if (response.status === 204) {
        fetchTodo()
        tostify_msg("error", "Successfully Deleted Todo")
        setTodoText("")
        setEditMode(false)
        setTodoId(null)
      }
      else{
        if (response.status === 401) {
          logoutUser();
          throw Error("Response was not OK!")
        }
      }
    }
    catch (error) {
      console.log("ERROR", error)
    }


  }

  const handleCheckboxChange = (event) => {
    let isChecked = event.target.checked
    let id = event.target.id

    updateCompletion(id, isChecked)
  }

  const updateCompletion = async (id, is_checked) => {
    const URL = `http://127.0.0.1:8000/api/todos/${id}/`
    const data = {
      is_completed: is_checked

    }
    try {
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        const response_data = await response.json()
        fetchTodo()
      }
      else {
        if (response.status === 401) {
          logoutUser();
        }
        throw Error("Response was not OK!")
      }
    }
    catch (error) {
      console.log("ERROR", error)
    }
  }

  const handleUnFinished = (e) => {
    let is_checked = e.target.checked
    setUnfinishedCheck(is_checked)
  }


  const pinnedTodos = todo.filter((item) => {
    return item.is_pinned
  })

  const unPinnedTodos = todo.filter((item) => {
    return !item.is_pinned
  })

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-slate-200 ">

        <div className=" rounded-lg shadow-2xl p-9 max-w-3xl w-full bg-slate-300 m-2">
          <h2 className=" mb-4 text-gray-700 text-2xl font-bold">Add Todo</h2>

          <div className="form flex">
            <input className='w-3/4 h-9 font-sans outline-none rounded-lg px-2' id='todo' ref={inputRef} value={todoText} onChange={(e) => {
              setTodoText(e.target.value)
            }} />
            {editMode ? (<button type='submit' className='bg-green-500 text-white font-bold w-18 rounded-xl mx-6 hover:bg-green-600 flex p-2 ' onClick={updateTodo}>Update <span className='text-2xl'><IoMdAddCircle /></span></button>) : (<button type='submit' className='bg-gray-800 text-white font-bold w-18 rounded-xl mx-6 hover:bg-red-600 flex p-2 ' onClick={createTodo}>Add <span className='text-2xl'><IoMdAddCircle /></span></button>)
            }

          </div>

          <div>
            <input type='checkbox' className='my-8' id='unfinished-check' checked={unfinishedCheck} onChange={handleUnFinished} />
            <label htmlFor='unfinished-check' className=' my-8 ml-2 text-gray-800 font-semibold'>Show Unfinished Tasks</label>
            <h2 className='text-gray-800 text-xl my-2 flex font-semibold '>Pinned <span className='text-2xl m-1'><VscPinnedDirty /></span></h2>
            {
              pinnedTodos.length > 0 ? pinnedTodos.map((item) => {
                return (

                  <div key={item.id} className='todos flex  gap-3  p-2 rounded-xl bg-gray-600 shadow-md my-2'>
                    <input className='h-7' type='checkbox' checked={item.is_completed ? true : false} id={item.id} onChange={handleCheckboxChange} />
                    <div className="todo">
                      <p className={item.is_completed ? "text-white text-lg line-through" : "text-white text-lg"}>{item.todo}</p>
                    </div>
                    <div className="btns gap-2 flex ml-auto">
                      <button type='button' className='bg-slate-600 hover:bg-slate-700 rounded-md text-white font-semibold p-1' onClick={() => { handleTodo(item) }}><FaEdit /></button>
                      <button type='button' className='bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold p-1' onClick={() => { deleteTodo(item) }}><MdDeleteSweep /></button>
                      <button type='button' className='bg-sky-400 hover:bg-sky-500 rounded-md text-white font-semibold p-1' onClick={() => {
                        updatePinnedTodo(item, false)
                      }}><TbPinnedOff /></button>
                    </div>
                  </div>
                )
              }) : (<p className='text-gray-800 font-extralight mb-2'>No pinned todo found!</p>)

            }
            <hr />
            <h2 className='text-gray-800 text-xl my-8 font-semibold flex'>Your Todo <span className='text-2xl m-1'><FcTodoList /></span></h2>
            {
              unPinnedTodos.length > 0 ?
                unPinnedTodos.map((item) => {
                  return (
                    <div key={item.id} className='todos flex  gap-3  p-2 rounded-xl bg-gray-600 text-white shadow-md my-2'>
                      <input className='h-7' type='checkbox' id={item.id} checked={item.is_completed ? true : false}
                        onChange={handleCheckboxChange} />
                      <div className="todo">
                        <p className={item.is_completed ? "text-white font-light text-lg line-through" : "text-white text-lg"}>{item.todo}</p>
                      </div>
                      <div className="btns gap-2 flex ml-auto">
                        <button type='button' className='bg-slate-600 hover:bg-slate-700 rounded-md p-1 text-white font-semibold ' onClick={() => { handleTodo(item) }}><FaEdit /></button>
                        <button type='button' className='bg-red-500 hover:bg-red-600 rounded-md p-1  text-white font-semibold  ' onClick={() => { deleteTodo(item) }}><MdDeleteSweep /></button>
                        <button type='button' className='bg-sky-400 hover:bg-sky-500 rounded-md text-white font-semibold p-1' onClick={() => {
                          updatePinnedTodo(item, true)
                        }}><VscPinnedDirty /></button>
                        <div className="try bg"></div>
                      </div>
                    </div>
                  )
                }) :
                (<p className='text-white font-extralight mb-2'>No unpinned todo found!</p>)
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Todo