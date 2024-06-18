import React from 'react'
import { Link } from "react-router-dom";
import notes from '../../assets/notes.jpg';
import AddButton from '../../components/notes/AddButton';


function ListItem(props) {
  return (
    <>
      <div className="all-notes col-span-1 relative">
      <Link to={`/note/${props.note.slug}`}>
        <div className="bg-slate-300 rounded shadow-md overflow-hidden">
          <img src={props.note.image && `${'http://127.0.0.1:8000'}${props.note.image}`} alt='notes-img' className='w-full h-32 sm:48 object-cover'/>
          <div className="card-body p-4">
            
            <span className='font-bold text-neutral-700 text-xl'>{props.note.title}</span>
            <span className='block text-neutral-600 mt-3'>{props.note.body?props.note.body.slice(0,100):props.note.body} <span className='font-light'>... read more</span></span>
            
            <p className='text-neutral-500 text-sm mt-3 mb-3 float-end'>Updated On: {props.note.created_date}</p>

          </div>
        </div>
        </Link>
      </div>
    </>
  )
}

export default ListItem