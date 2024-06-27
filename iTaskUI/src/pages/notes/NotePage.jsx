import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tostify from '../../components/Tostify';
import { useAuth } from '../../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NotePage() {
  const params = useParams();
  const navigate = useNavigate();
  const slug_field = params.slug;

  const [note, setNote] = useState(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const editableDivRef = useRef(null);
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)


  const { authToken, logoutUser } = useAuth();

  useEffect(() => {
    getNote();
  }, [slug_field]); // Adding slug_field to dependency array

  const tostify_msg = (type, message) => {
    Tostify(type, message);
  };

  const getNote = async () => {
    const URL = `http://127.0.0.1:8000/api/fetch-note/${slug_field}/`;
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
      });
      if (response.status === 200) {
        const data = await response.json();

        setNote(data);
        setTitle(data.title);
        setText(data.body);

        if (editableDivRef.current) {
          editableDivRef.current.innerHTML = data.body;
        }
      } else if (response.status === 401) {
        logoutUser();
        throw new Error('Unauthorized access - logging out');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  const handleOnChangeTitle = (event) => {
    let title = event.target.value;
    setTitle(title);
  };

  const updateNote = async () => {
    const data = {
      title: title,
      body: text,
    };

    const URL = `http://127.0.0.1:8000/api/update-note/${slug_field}/`;

    try {
      setIsUpdating(true)
      const response = await fetch(URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const result = await response.json();
        tostify_msg('success', 'Successfully Updated Note.');
        setTimeout(() => {
          navigate('/notes');
          setIsUpdating(false)

        }, 2000);
      } else if (response.status === 401) {
        logoutUser();
        throw new Error('Unauthorized access - logging out');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setIsUpdating(false)
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const deleteNote = async () => {
    const URL = `http://127.0.0.1:8000/api/delete-note/${slug_field}/`;
    try {
      setIsDeleting(true)
      const response = await fetch(URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authToken.access),
        },
      });

      if (response.status === 204) {
        tostify_msg('success', 'Successfully Deleted Note.');
        setTimeout(() => {
          navigate('/notes');
          setIsDeleting(false)
        }, 2000);
      } else if (response.status === 401) {
        logoutUser();
        throw new Error('Unauthorized access - logging out');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setIsDeleting(false)
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-3 text-center font-bold text-3xl mb-3 text-gray-900">
          Note Details
        </h2>
        <div className="card note-details mt-5 max-w-7xl mx-20 bg-slate-300 shadow-md">
          <div className="card-body">
            <div className="note-header">
              <input
                className="title-input fw-bold fs-4 text-gray-800 mx-4 "
                value={title}
                onChange={handleOnChangeTitle}
              />
              <div className="buttons">
                <button
                  className="rounded-full bg-slate-900 p-2 text-md border-white border-1 hover:bg-slate-800 ease-in-out transition duration-700" disabled={isUpdating}
                  onClick={updateNote}
                >
                  Update
                </button>
                <button
                  className="ml-1 rounded-full bg-red-500 p-2 text-md border-white border-1 hover:bg-red-400 ease-in-out transition duration-700" disabled={isDeleting}
                  onClick={deleteNote}
                >
                  Delete
                </button>
              </div>
            </div>
            <ReactQuill theme="snow" value={text} onChange={(newText) => setText(newText)} className='p-4 text-black text-3xl' />

            {note && (
              <div className="footer d-flex g-4 mt-5 float-end text-gray-900">
                <p className="card-link fw-lighter">
                  Created: {new Date(note.created_date).toLocaleDateString()}
                </p>
                <p className="card-link fw-lighter">
                  Last Update: {new Date(note.updated_date).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default NotePage;
