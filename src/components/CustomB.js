import React from 'react'

const CustomB = props => {
  const { tittle, className, type } = props

  return (
    <button className={`bOfBlog ${className}`} type={type} to='/'>
      <i className='animation'></i>
      {tittle}
      <i className='animation'></i>
    </button>
  )
}

export default CustomB
