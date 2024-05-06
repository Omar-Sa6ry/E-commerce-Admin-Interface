import React from 'react'

const ButtonAuth = props => {
  const { to, tittle, className, type } = props
  return (
    <>
      <button
        className={`flex-center w-100 ${className} aOfB`}
        type={type}
        to={to}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {tittle}
      </button>
    </>
  )
}

export default ButtonAuth
