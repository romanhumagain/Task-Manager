import React, { useState, useEffect } from 'react';
import ListItem from '../../components/notes/ListItem';
import AddButton from '../../components/notes/AddButton';
import { useAuth } from '../../contexts/AuthContext';
import { MdOutlineContentPasteSearch } from "react-icons/md";

import createAxiosInstance from '../../api/axiosInstance';

function NotesListPage() {
  const [notes, setNotes] = useState([]);
  const [searchedData, setSearchedData] = useState("")
  const { authToken, logoutUser } = useAuth()

  const axiosInstance = createAxiosInstance()

  useEffect(() => {
    getNotes();
  }, [searchedData]);

  const handleSearch = (e) => {
    const text = e.target.value
    setSearchedData(text)
  }

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get(`get-notes/`, {
        params: { search: searchedData }
      });
      setNotes(response.data)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        logoutUser();
      }
    }
  }

  return (
    <>
      <div className='bg-slate-200 h-screen'>
        <h2 className='mt-3 text-center  font-bold text-3xl text-gray-600'>
          Your Available Notes
        </h2>
        <div className='flex justify-center mt-4'>
          <MdOutlineContentPasteSearch className='text-3xl mt-1 text-gray-600 mx-1' /><input value={searchedData} onChange={handleSearch} type="text" id="small-input" class="block font-normal text-md  p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 h-3" placeholder='Search your notes...' />

        </div>
        <div className="flex justify-center items-center mt-3 h-auto bg-slate-200">
          <div className="relative rounded-lg shadow-md p-6 py-8 max-w-6xl w-full bg-slate-300 m-2 grid md:grid-cols-3 gap-7">
            <div className="absolute -top-3 -right-3">
              <AddButton />
            </div>
            {notes.map((note, index) => (
              <div key={note.id}>
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
