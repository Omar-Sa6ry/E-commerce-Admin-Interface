import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  createblogCats,
  getblogCat,
  resetState,
  updateAblogCat
} from '../features/blogCat/blogCatSlice'
import CustomInput from '../components/CustomInput'
import CustomB from '../components/CustomB'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'

const NameC = 'Category'
const NameS = 'category'

let schema = yup.object().shape({
  title: yup.string().required(`${NameC} Name is Required`)
})

const AddBlogCat = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const newcategory = useSelector(state => state?.blogCat)
  const {
    isSuccess,
    isError,
    isLoading,
    createdblogCat,
    blogCatName,
    updateblogCat
  } = newcategory

  // Get Id
  const getId = location?.pathname?.split('/')[3]
  useEffect(() => {
    if (getId) {
      dispatch(getblogCat(getId))
    } else {
      dispatch(resetState())
    }
  }, [getId])

  useEffect(() => {
    if (isSuccess) {
      if (createdblogCat) {
        toast.success(`${NameC} Added Successfullly!`)
      }
      if (updateblogCat) {
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
      title: blogCatName || ''
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getId) {
        const data = { id: getId, categoryData: values }
        dispatch(updateAblogCat(data))
        dispatch(resetState())
        setTimeout(() => {
          dispatch(resetState())
          navigate(`/admin/blog-${NameS}-list`)
        }, TIMETOAST)
      } else {
        dispatch(createblogCats(values))
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

export default AddBlogCat
