import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'
import CustomInput from '../components/CustomInput'
import CustomB from '../components/CustomB'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import {
  createCoupons,
  getcoupon,
  resetState,
  updateAcoupon
} from '../features/coupon/couponSlice'

const NameC = 'Coupon'
const NameS = 'coupon'

let schema = yup.object().shape({
  name: yup.string().required('Coupon Name is Required'),
  expiry: yup.date().required('Expiry Date is Required'),
  discount: yup.number().required('Discount Percentage is Required')
})

const AddCoupon = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const newCoupon = useSelector(state => state?.coupon)
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    expiryName,
    discountName,
    updatecoupon
  } = newCoupon

  const changeDateFormet = date => {
    const newDate = new Date(date).toLocaleDateString()
    const [month, day, year] = newDate.split('/')
    return [year, month, day].join('-')
  }

  // Get Id
  const getId = location?.pathname?.split('/')[3]
  useEffect(() => {
    if (getId) {
      dispatch(getcoupon(getId))
    } else {
      dispatch(resetState())
    }
  }, [getId])

  useEffect(() => {
    if (isSuccess) {
      if (createdCoupon) {
        toast.success(`${NameC} Added Successfullly!`)
      }
      if (updatecoupon) {
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
      name: couponName || '',
      discount: discountName || '',
      expiry: changeDateFormet(expiryName) || ''
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getId) {
        const data = { id: getId, couponData: values }
        dispatch(updateAcoupon(data))
        dispatch(resetState())
      } else {
        dispatch(createCoupons(values))
        formik.resetForm()
      }
      setTimeout(() => {
        dispatch(resetState())
        navigate(`/admin/${NameS}-list`)
      }, TIMETOAST)
    }
  })

  return (
    <>
      <h3 className='mb-4'>{getId ? `Edit a ${NameC}` : `Add a ${NameC}`} </h3>

      <div className='addBlog mt-4'>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            placeholder='Enter a Coupon : '
            type='text'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          <div className='error'>
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            placeholder='Enter a Discount : '
            type='number'
            value={formik.values.discount}
            name='discount'
            onChange={formik.handleChange('discount')}
            onBlur={formik.handleBlur('discount')}
          />
          <div className='error'>
            {formik.touched.discount && formik.errors.discount}
          </div>

          <CustomInput
            placeholder='Enter an Expery Date : '
            type='date'
            value={formik.values.expiry}
            name='discount'
            onChange={formik.handleChange('expiry')}
            onBlur={formik.handleBlur('expiry')}
          />
          <div className='error'>
            {formik.touched.expiry && formik.errors.expiry}
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

export default AddCoupon
