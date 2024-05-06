import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import customerReducer from '../features/customers/customersSlice'
import productReducer from '../features/products/productSlice'
import brandReducer from '../features/brand/brandSlice'
import pCatagoryReducer from '../features/pcatagory/pCatagorySlice'
import colorReducer from '../features/color/colorSlice'
import blogReducer from '../features/blog/blogSlice'
import blogCatReducer from '../features/blogCat/blogCatSlice'
import enquiryReducer from '../features/enquiry/enquirySlice'
import uploadReducer from '../features/upload/uploadSlice'
import couponReducer from '../features/coupon/couponSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pcatagory: pCatagoryReducer,
    color: colorReducer,
    blog: blogReducer,
    blogCat: blogCatReducer,
    enquiry: enquiryReducer,
    coupon: couponReducer,
    upload: uploadReducer
  }
})
