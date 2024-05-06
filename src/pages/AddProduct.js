import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { getBrands } from '../features/brand/brandSlice'
import { getcolors } from '../features/color/colorSlice'
import { getpCatagories } from '../features/pcatagory/pCatagorySlice'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import CustomInput from '../components/CustomInput'
import { Select } from 'antd'
import CustomB from '../components/CustomB'
import { toast } from 'react-toastify'
import { delImg, uploadImages } from '../features/upload/uploadSlice'
import {
  createProducts,
  getAproduct,
  resetState,
  updateAproduct
} from '../features/products/productSlice'
import Dropzone from 'react-dropzone'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'

const NameC = 'Product'
const NameS = 'product'

let schema = yup.object().shape({
  title: yup.string().required('Title is Required'),
  description: yup.string().required('Description is Required'),
  price: yup.number().required('Price is Required'),
  quantity: yup.number().required('Quantity is Required'),
  brand: yup.string().required('Brand is Required'),
  category: yup.string().required('Category is Required'),
  tags: yup.string().required('Tag is Required'),
  color: yup
    .array()
    .min(1, 'Pick at least one color')
    .required('Color is Required')
})

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [color, setcolor] = useState([])

  useEffect(() => {
    formik.values.color = color ? color : ' '
  }, [color])

  useEffect(() => {
    dispatch(getBrands())
    dispatch(getcolors())
    dispatch(getpCatagories())
  }, [])

  const brandState = useSelector(state => state?.brand?.brands)
  const colorState = useSelector(state => state?.color?.colors)
  const catState = useSelector(state => state?.pcatagory?.pCatagories)
  const imgState = useSelector(state => state?.upload?.images)
  const newProduct = useSelector(state => state?.product)

  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    productTags,
    productQuantity,
    productPrice,
    productName,
    productBrand,
    productCat,
    productColor,
    productImage,
    productDesc,
    updateproduct
  } = newProduct

  useEffect(() => {
    if (isSuccess) {
      if (createdProduct) {
        toast.success(`${NameC} Added Successfullly!`)
      }
      if (updateproduct) {
        toast.success(`${NameC} Updated Successfullly!`)
      }
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isError, isLoading])

  let coloropt = []
  colorState.forEach(i => {
    coloropt.push({
      label: i?.title,
      value: i?._id
    })
  })

  let img = []
  imgState.forEach(i => {
    img.push({
      public_id: i?.public_id,
      url: i?.url
    })
  })

  useEffect(() => {
    formik.values.color = color ? color : ' '
    formik.values.images = img
  }, [color])

  // Get Id
  const getId = location.pathname.split('/')[3]
  useEffect(() => {
    if (getId) {
      dispatch(getAproduct(getId))
    } else {
      dispatch(resetState())
    }
  }, [getId])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productName || '',
      description: productDesc || '',
      color: productColor || '',
      quantity: productQuantity || '',
      brand: productBrand || '',
      category: productCat || '',
      images: productImage || '',
      tags: productTags || '',
      price: productPrice || ''
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getId) {
        const data = { id: getId, productData: values }
        dispatch(updateAproduct(data))
        dispatch(resetState())
        setTimeout(() => {
          dispatch(resetState())
          navigate(`/admin/${NameS}s-list`)
        }, TIMETOAST)
      } else {
        if (img?.length === 0) {
          toast.error('Please ,Enter Img For Product')
        } else {
          dispatch(createProducts(values))
          setcolor(null)
          formik.resetForm()
          dispatch(delImg(img[0]?.public_id))
        }
      }
    }
  })

  const handleColors = e => {
    setcolor(e)
  }

  return (
    <>
      <h3 className='mb-4'>{getId ? `Edit a ${NameC}` : `Add a ${NameC}`} </h3>
      <div className='addBlog mt-4'>
        <form
          onSubmit={formik.handleSubmit}
          className='d-flex flex-column gap-3'
        >
          <CustomInput
            placeholder='Enter a Product : '
            type='text'
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
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
          />
          <div className='error'>
            {formik.touched.description && formik.errors.description}
          </div>

          <CustomInput
            placeholder='Enter a Product Price : '
            type='number'
            name='price'
            id='price'
            value={formik.values.price}
            onChange={formik.handleChange('price')}
            onBlur={formik.handleBlur('price')}
          />
          <div className='error'>
            {formik.touched.price && formik.errors.price}
          </div>

          <select
            className='seletOfAddBlog py-3 mb-3 form-select form-select-sm'
            value={formik.values.brand}
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
          >
            <option value=''>Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              )
            })}
          </select>
          <div className='error'>
            {formik.touched.brand && formik.errors.brand}
          </div>

          <Select
            mode='multiple'
            allowClear
            className='w-100'
            placeholder='Select colors'
            defaultValue={color}
            onChange={i => handleColors(i)}
            options={coloropt}
          />
          <div className='error'>
            {formik.touched.color && formik.errors.color}
          </div>

          <select
            className='seletOfAddBlog py-3 mb-3 form-select form-select-sm'
            value={formik.values.category}
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

          <select
            className='seletOfAddBlog py-3 mb-3 form-select form-select-sm'
            onChange={formik.handleChange('tags')}
            onBlur={formik.handleBlur('tags')}
            value={formik.values.tags}
            id='tags'
          >
            <option value='' disabled>
              Select Tag
            </option>
            <option value='featured'>Featured</option>
            <option value='popular'>Popular</option>
            <option value='special'>Special</option>
          </select>
          <div className='error'>
            {formik.touched.tags && formik.errors.tags}
          </div>

          <CustomInput
            placeholder='Enter a Product Quantity : '
            type='number'
            value={formik.values.quantity}
            onChange={formik.handleChange('quantity')}
            onBlur={formik.handleBlur('quantity')}
          />
          <div className='error'>
            {formik.touched.quantity && formik.errors.quantity}
          </div>

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

          <div className='error'>
            {formik.touched.title && formik.errors.title}
            <br />
            {formik.touched.description && formik.errors.description}
            <br />
            {formik.touched.brand && formik.errors.brand}
            <br />
            {formik.touched.color && formik.errors.color}
            <br />
            {formik.touched.price && formik.errors.price}
            <br />
            {formik.touched.tags && formik.errors.tags}
            <br />
            {formik.touched.category && formik.errors.category}
            <br />
            {formik.touched.quantity && formik.errors.quantity}
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

export default AddProduct
