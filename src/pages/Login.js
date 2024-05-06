import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import ButtonAuth from '../components/ButtonAuth'
import CustomInput from '../components/CustomInput'
import { login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

let schema = yup.object().shape({
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is Required'),
  password: yup.string().required('Password is Required')
})

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authState = useSelector(state => state)
  const { user, isError, isSuccess, isLoading, message } = authState?.auth

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values))
    }
  })

  useEffect(() => {
    if (!user == null || isSuccess) {
      setTimeout(() => {
        navigate('/admin')
        toast.success('User is Logged Successfullly!')
      }, 3000)
    }
  }, [user, isError, isSuccess, isLoading, message])

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            placeholder='Email Address'
            id='email'
            name='email'
            onChange={formik.handleChange('email')}
            val={formik.values.email}
          />
          <div className='error'>
            {formik.touched.email && formik.errors.email}
          </div>

          <CustomInput
            type='password'
            placeholder='Password'
            id='pass'
            name='password'
            onChange={formik.handleChange('password')}
            val={formik.values.password}
          />
          <div className='error'>
            {formik.touched.password && formik.errors.password}
          </div>
          <ButtonAuth tittle='Login' />
        </form>
      </div>
    </div>
  )
}

export default Login
