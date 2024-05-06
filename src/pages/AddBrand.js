import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  createBrands,
  getABrand,
  updateABrand,
  resetState
} from '../features/brand/brandSlice'
import CustomInput from '../components/CustomInput'
import CustomB from '../components/CustomB'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'

const NameC = 'Brand'
const NameS = 'brand'

let schema = yup.object().shape({
  title: yup.string().required(`${NameC} Name is Required`)
})

const AddBrand = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const newBrand = useSelector(state => state?.brand)
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updateBrand
  } = newBrand

  // Get Id
  const getId = location?.pathname?.split('/')[3]
  useEffect(() => {
    if (getId) {
      dispatch(getABrand(getId))
    } else {
      dispatch(resetState())
    }
  }, [getId])

  useEffect(() => {
    if (isSuccess) {
      if (createdBrand) {
        toast.success(`${NameC} Added Successfullly!`)
      }
      if (updateBrand) {
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
      title: brandName || ''
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getId) {
        const data = { id: getId, brandData: values }
        dispatch(updateABrand(data))
        dispatch(resetState())
        setTimeout(() => {
          dispatch(resetState())
          navigate(`/admin/${NameS}-list`)
        }, TIMETOAST)
      } else {
        dispatch(createBrands(values))
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
            placeholder={`Enter a ${NameC} : `}
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
            tittle={getId ? `Edit a ${NameC}` : `Add a ${NameC}`}
            type='submit'
          />
        </form>
      </div>
    </>
  )
}

export default AddBrand
