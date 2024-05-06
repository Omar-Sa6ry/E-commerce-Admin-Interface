import React from 'react'
import CustomInput from '../components/CustomInput'
import ButtonAuth from '../components/ButtonAuth'
import { Link } from 'react-router-dom'

const CustomForm = props => {
  const { tittle, button, password, to } = props
  if (password === 'login') {
    return (
      <div className='login-container'>
        <div className='login-box'>
          <h2>{tittle}</h2>
          <form>
            <CustomInput placeholder='Email' name='email' type='text' />
            <CustomInput
              placeholder='Password'
              type='password'
              name='password'
            />
            <Link className='forgot-a' to='/forgot-password'>
              Forgot Password
            </Link>
            <ButtonAuth to={to} tittle={button} />
          </form>
        </div>
      </div>
    )
  }
}

export default CustomForm
