import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import {
  createpCatagories,
  updateAcat,
  resetState,
  getcat
} from '../features/pcatagory/pCatagorySlice'
import * as yup from 'yup'
import CustomInput from '../components/CustomInput'
import CustomB from '../components/CustomB'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'

const NameC = 'Category'
const NameS = 'category'

let schema = yup.object().shape({
  title: yup.string().required('Category Name is Required')
})

const AddCatagory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const newCat = useSelector(state => state?.pcatagory)

  const {
    isSuccess,
    isError,
    isLoading,
    createdpCatagory,
    catName,
    updateCat
  } = newCat

  // Get Id
  const getId = location?.pathname?.split('/')[3]
  useEffect(() => {
    if (getId) {
      dispatch(getcat(getId))
    } else {
      dispatch(resetState())
    }
  }, [getId])

  useEffect(() => {
    if (isSuccess) {
      if (createdpCatagory) {
        toast.success(`${NameC} Added Successfullly!`)
      }
      if (updateCat) {
        toast.success(`${NameC} Updated Successfullly!`)
      }
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: catName || ''
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getId) {
        const data = { id: getId, catData: values }
        dispatch(updateAcat(data))
        dispatch(resetState())
        setTimeout(() => {
          dispatch(resetState())
          navigate(`/admin/${NameS}-list`)
        }, TIMETOAST)
      } else {
        dispatch(createpCatagories(values))
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
            placeholder='Enter a Category : '
            type='text'
            name='title'
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

export default AddCatagory
