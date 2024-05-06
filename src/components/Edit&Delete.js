import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const EditDelete = props => {
  const { Edit, onClick } = props

  return (
    <>
      <Link to={Edit} className=' fs-3 text-danger'>
        <BiEdit />
      </Link>
      <button onClick={onClick} className='ms-3 fs-3 text-danger border-0 bg-transparent' to='/'>
        <AiFillDelete />
      </button>
    </>
  )
}

export default EditDelete
