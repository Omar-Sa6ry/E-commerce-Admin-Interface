import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/all-coupon`, config)
  return response.data
}

const createCoupon = async Coupon => {
  const response = await axios.post(
    `${base_url}Coupon/create-Coupon`,
    Coupon,
    config
  )
  return response.data
}

const getCoupon = async id => {
  const response = await axios.get(`${base_url}Coupon/${id}`)
  return response.data
}

const updateCoupon = async Coupon => {
  const response = await axios.put(
    `${base_url}Coupon/${Coupon.id}`,
    {
      name: Coupon.couponData.name,
      expiry: Coupon.couponData.expiry,
      discount: Coupon.couponData.discount
    },
    config
  )
  return response.data
}

const deleteCoupon = async id => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config)
  return response.data
}

const CouponService = {
  getCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon
}

export default CouponService
