import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tostify from '../../components/Tostify'


function NotePage() {
  const params = useParams();
  const navigate = useNavigate();
  const slug_field = params.slug;

  const [note, setNote] = useState([]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const editableDivRef = useRef(null);

  useEffect(() => {
    getNote();
  }, []);

  const tostify_msg = (type, message) => {
    Tostify(type, message);
  }
  const getNote = async () => {
    const URL = `http://127.0.0.1:8000/api/fetch-note/${slug_field}/`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNote(data);
      setTitle(data[0].title)
      setText(data[0].text)

      if (editableDivRef.current) {
        editableDivRef.current.innerHTML = data[0].body;
      }
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  const handleEditableChange = () => {
    setText(editableDivRef.current.innerText);
  };

  const handleOnChangeTitle = (event) => {
    let title = event.target.value;
    console.log(title)
    setTitle(title);
  };

  const updateNote = async () => {
    const data = {
      title: title,
      body: text,
    };

    console.log(data)

    const URL = `http://127.0.0.1:8000/api/update-note/${slug_field}/`;

    try {
      const response = await fetch(URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      tostify_msg("success", "Successfully Updated Note.")
      setTimeout(() => {
        navigate('/notes');
      }, 2000);
      

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const deleteNote = async () => {
    const URL = `http://127.0.0.1:8000/api/delete-note/${slug_field}/`;
    try {
      const response = await fetch(URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      tostify_msg("success", "Successfully Deleted Note.")

      setTimeout(() => {
        navigate('/notes');
      }, 2000);

      if (!response.ok) {
        throw new Error('Network response was not ok !');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className='mt-3 text-center  font-bold text-3xl mb-3 text-red-500'>Note Details</h2>
        <div className="card note-details mt-5 max-w-7xl mx-20 bg-neutral-700">
          <div className="card-body">
            {note.map((note_data, index) => (
              <div key={index}>
                <div className="note-header">
                  <input
                    className="title-input fw-bold fs-4"
                    value={title}
                    onChange={handleOnChangeTitle}
                  />
                  <div className="buttons">
                    <button
                      className="rounded-full bg-slate-900 p-2 text-md border-white border-1 hover:bg-slate-800 ease-in-out transition duration-700"
                      onClick={updateNote}
                    >
                      Update
                    </button>
                    <button
                      className="ml-1 rounded-full bg-red-500 p-2 text-md border-white border-1 hover:bg-red-400 ease-in-out transition duration-700"
                      onClick={deleteNote}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div
                  ref={editableDivRef}
                  className="note-area bg-zinc-500 text-white placeholder-gray-400 border border-gray-500 rounded-lg px-3 py-2 outline-none resize-none min-h-64 w-full mt-2"
                  contentEditable
                  onInput={handleEditableChange}
                  placeholder="Note Body"
                />
                <div className="footer d-flex g-4 mt-5 float-end">
                  <p className="card-link fw-lighter">
                    Created: {note_data.created_date}
                  </p>
                  <p className="card-link fw-lighter">
                    Last Update: {note_data.updated_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default NotePage;
