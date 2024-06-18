import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Tostify from '../../components/Tostify'
import { useAuth } from '../../contexts/AuthContext';


function AddNote() {
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null)
  const editableDivRef = useRef(null);

  const {authToken, logoutUser} = useAuth()

  const tostify_msg = (type, message) => {
    Tostify(type, message);
  }

  const handleEditableChange = () => {
    setText(editableDivRef.current.innerText);
  };

  const handleOnChange = (event) => {
    let text = event.target.value
    setText(text)
  }

  const handleOnChangeTitle = (event) => {
    let title = event.target.value
    setTitle(title)
  }

  const handleImage = (e)=>{
    let note_img = e.target.files[0]
    setImage(note_img)

  }

  const addNote = async () => {
    if (!title || !text) {
      toast.error('Please provide title and note body!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const URL = 'http://127.0.0.1:8000/api/create-note/';
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', text);
      if (image) {
        formData.append('image', image);
      }
  
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer ' + String(authToken.access),
          },
          body: formData
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            logoutUser();
            throw new Error('Unauthorized access - logging out');
          }
          throw new Error("Network response was not ok!");
        }
  
        const result = await response.json();
        console.log(result);
  
        tostify_msg("success", "Successfully Added Note.");
  
        setTimeout(() => {
          navigate('/notes');
        }, 2000);
  
      } catch (error) {
        console.log("ERROR OCCUR", error);
      }
    }
  };
  
  return (
    <>
      <div className="container">
        <h2 className='mt-3 text-center  font-bold text-3xl mb-3 text-red-500'>
          Add Note
        </h2>
        <div className="card note-details max-w-7xl mx-20 h-auto bg-neutral-700">
          <div className="card-body">
            <div className="note-header mt-1">
              <input className='title-input fw-bold fs-4' value={title} onChange={handleOnChangeTitle} placeholder='Title'></input>
              <h5 className="card-title my-2"></h5>
              <div className="buttons">
                <button className='rounded-full  p-2 text-md border-white border-1 hover:bg-red-700  ease-in-out transition duration-700' onClick={addNote}>Add Note</button>
              
              </div>
            </div>
            <input className=' bg-gray-300 text-black rounded-lg mt-3' placeholder='Note Cover Image' type='file' accept="image/*" onChange={handleImage}/>
            
            <p className='mt-3 font-bold text-gray-100 text-xl'>Note Body</p>
            <div
              ref={editableDivRef}
              className='note-area bg-zinc-500 text-white placeholder-gray-400 border border-gray-500 rounded-lg px-3 py-2 outline-none resize-none min-h-72  w-full mt-2 '
              contentEditable
              onInput={handleEditableChange}
              placeholder='Note Body'
            />
            </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AddNote