import React from 'react'
import '../css/Login.css'

const CustomInput = props => {
  const { name, className, placeholder, type, id, value, onChange, onBlur } =
    props

  return (
    <div style={{ marginBottom: '20px' }} className='user-box'>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${className}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default CustomInput
