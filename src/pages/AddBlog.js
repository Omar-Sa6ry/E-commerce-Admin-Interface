import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import CustomInput from '../components/CustomInput'
import '../css/Admin.css'
import CustomB from '../components/CustomB'
import { toast } from 'react-toastify'
import { delImg, uploadImages } from '../features/upload/uploadSlice'
import {
  createblogs,
  getblog,
  resetState,
  updateAblog
} from '../features/blog/blogSlice'
import Dropzone from 'react-dropzone'
import { getblogCats } from '../features/blogCat/blogCatSlice'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'

const NameC = 'Blog'
const NameS = 'blog'

let schema = yup.object().shape({
  title: yup.string().required('Title is Required'),
  description: yup.string().required('Description is Required'),
  category: yup.string().required('Category is Required')
})

const AddBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(getblogCats())
  }, [])

  const catState = useSelector(state => state?.blogCat?.blogCats)
  const imgState = useSelector(state => state?.upload?.images)
  const newBlog = useSelector(state => state?.blog)
  const {
    isSuccess,
    isError,
    isLoading,
    createdblog,
    blogName,
    blogDesc,
    blogImage,
    blogCat,
    updateblog
  } = newBlog

  // Get Id
  const getId = location?.pathname?.split('/')[3]
  useEffect(() => {
    if (getId) {
      dispatch(getblog(getId))
    } else {
      dispatch(resetState())
    }
  }, [getId])

  useEffect(() => {
    if (isSuccess) {
      if (createdblog) {
        toast.success(`${NameC} Added Successfullly!`)
      }
      if (updateblog) {
        toast.success(`${NameC} Updated Successfullly!`)
      }
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isSuccess, isError, isLoading])

  let img = []
  imgState?.forEach(i => {
    img.push({
      public_id: i?.public_id,
      url: i?.url
    })
  })

  useEffect(() => {
    formik.values.images = img
  }, [img])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || '',
      description: blogDesc || '',
      category: blogCat || '',
      images: blogImage || ''
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getId) {
        const data = { id: getId, blogData: values }
        dispatch(updateAblog(data))
        dispatch(resetState())
        setTimeout(() => {
          dispatch(resetState())
          navigate(`/admin/${NameS}s-list`)
        }, TIMETOAST)
      } else {
        if (img?.length === 0) {
          toast.error('Please ,Enter Img For Blog')
        } else {
          dispatch(createblogs(values))
          formik.resetForm()
          dispatch(delImg(img[0]?.public_id))
        }
      }
      setTimeout(() => {
        dispatch(resetState())
      }, TIMETOAST)
    }
  })

  return (
    <>
      <h3 className='mb-4'>{getId ? `Edit a ${NameC}` : `Add a ${NameC}`} </h3>

      <div className='addBlog mt-4'>
        <form
          onSubmit={formik.handleSubmit}
          className='d-flex flex-column gap-3'
        >
          <div className='bg-white border-1 p-5 text-center'>
            <Dropzone
              onDrop={acceptedFiles => dispatch(uploadImages(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Please ,Enter To Upload Product Image</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className='showimages d-flex flex-wrap gap-3'>
            {imgState?.map((i, j) => {
              return (
                <div className=' position-relative' key={j}>
                  <button
                    type='button'
                    onClick={() => dispatch(delImg(i?.public_id))}
                    className='btn-close position-absolute'
                    style={{ top: '10px', right: '10px' }}
                  ></button>
                  <img src={i.url} alt='' width={200} height={200} />
                </div>
              )
            })}
          </div>

          <CustomInput
            placeholder='Enter a Blog : '
            type='text'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>

          <ReactQuill
            style={{ backgroundColor: '#fff' }}
            theme='snow'
            value={formik.values.description}
            name='description'
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
          />
          <div className='error'>
            {formik.touched.description && formik.errors.description}
          </div>

          <select
            className='seletOfAddBlog py-3 mb-3 form-select form-select-sm'
            value={formik.values.category}
            name='cat'
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
          >
            <option>Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              )
            })}
          </select>
          <div className='error'>
            {formik.touched.category && formik.errors.category}
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

export default AddBlog
