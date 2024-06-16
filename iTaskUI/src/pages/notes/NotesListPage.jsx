import React, { useState, useEffect } from 'react';
import ListItem from '../../components/notes/ListItem';
import AddButton from '../../components/notes/AddButton';

function NotesListPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    let URL = "http://127.0.0.1:8000/api/get-notes/";
    let response = await fetch(URL);
    let data = await response.json();
    setNotes(data);
  };

  return (
    <>
    <div className='bg-slate-50 h-screen'>
    <h2 className='mt-4 text-center  font-bold text-3xl text-red-500'>
          Your Available Notes
        </h2>
      <div className="flex justify-center items-center mt-5 h-auto bg-slate-50">
        <div className="relative rounded-lg shadow-md p-6 py-8 max-w-6xl w-full bg-neutral-700 m-2 grid md:grid-cols-3 gap-7">
          <div className="absolute -top-3 -right-3">
            <AddButton />
          </div>
          {notes.map((note, index) => (
            <div key={index}>
              <ListItem note={note} />
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default NotesListPage;
