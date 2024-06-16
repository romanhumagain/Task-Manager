import React from 'react'
import addIcon from '../../assets/add.svg';
import { Link } from 'react-router-dom'

function AddButton() {
  return (
    <div className=''>
      <Link to="/note/new" className='add-btn'>
      <img src={addIcon} alt="Add" />
    </Link>
    </div>
  )
}

export default AddButton