import React from 'react'
import { Link } from "react-router-dom";
import notes from '../../assets/notes.jpg';
import AddButton from '../../components/notes/AddButton';


function ListItem(props) {
  // Function to safely extract a preview of the HTML content
  const createPreviewMarkup = (htmlString) => {
    const preview = htmlString ? htmlString.slice(0, 100) : '';
    return { __html: preview };
  };

  return (
    <>
      <div className="all-notes col-span-1 relative">
        <Link to={`/note/${props.note.slug}`}>
          <div className="bg-slate-200 rounded shadow-md overflow-hidden">
            <img src={props.note.image && `${props.note.image}`} alt='notes-img' className='w-full h-32 sm:48 object-cover' />
            <div className="card-body p-4 max-h-5"  >
              <span className='font-bold text-neutral-700 text-xl'>{props.note.title}</span>
              <span className='block text-neutral-600 mt-3' style={{ maxHeight: '120px', overflow: 'hidden' }}>
                <span
                  dangerouslySetInnerHTML={createPreviewMarkup(props.note.body)}
                />
                {props.note.body && props.note.body.length > 80 && (
                  <span className='font-light'>... read more</span>
                )}
              </span>
              <p className='text-neutral-500 text-sm mt-3 mb-3 float-end'>Updated On: {props.note.created_date}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ListItem