import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import {
  createcolors,
  getcolor,
  updateAcolor,
  resetState
} from '../features/color/colorSlice'
import * as yup from 'yup'
import CustomInput from '../components/CustomInput'
import CustomB from '../components/CustomB'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'

const NameC = 'Color'
const NameS = 'color'

let schema = yup.object().shape({
  title: yup.string().required('Color Name is Required')
})

const AddColor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const newColor = useSelector(state => state?.color)
  const {
    isSuccess,
    isError,
    isLoading,
    createdcolor,
    colorName,
    updatecolor
  } = newColor

  // Get Id
  const getId = location?.pathname?.split('/')[3]
  useEffect(() => {
    if (getId) {
      dispatch(getcolor(getId))
    } else {
      dispatch(resetState())
    }
  }, [getId])

  useEffect(() => {
    if (isSuccess) {
      if (createdcolor) {
        toast.success(`${NameC} Added Successfullly!`)
      }
      if (updatecolor) {
        toast.success(`${NameC} Updated Successfullly!`)
      }
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(resetState())
  }, [isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || ''
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getId) {
        const data = { id: getId, colorData: values }
        dispatch(updateAcolor(data))
        dispatch(resetState())
        setTimeout(() => {
          dispatch(resetState())
          navigate(`/admin/${NameS}-list`)
        }, TIMETOAST)
      } else {
        dispatch(createcolors(values))
        formik.resetForm()
      }
    }
  })

  return (
    <>
      <h3 className='mb-4'>{getId ? `Edit a ${NameC}` : `Add a ${NameC}`} </h3>

      <div className='addBlog mt-4'>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            placeholder='Enter a Color : '
            type='color'
            className='h-40px'
            name='color'
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>

          <CustomB
            type='submit'
            tittle={getId ? `Edit a ${NameC}` : `Add a ${NameC}`}
          />
        </form>
      </div>
    </>
  )
}

export default AddColor
