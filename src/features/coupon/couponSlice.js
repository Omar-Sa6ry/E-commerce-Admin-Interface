import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import couponService from './couponServices'
import { toast } from 'react-toastify'

export const getCoupons = createAsyncThunk(
  'coupon/get-coupons',
  async thunkAPI => {
    try {
      return await couponService.getCoupons()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const createCoupons = createAsyncThunk(
  'coupon/create-coupon',
  async (CouponData, thunkAPI) => {
    try {
      return await couponService.createCoupon(CouponData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const getcoupon = createAsyncThunk(
  'coupon/get-coupon',
  async (id, thunkAPI) => {
    try {
      return await couponService.getCoupon(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateAcoupon = createAsyncThunk(
  'coupon/update-coupon',
  async (coupon, thunkAPI) => {
    try {
      return await couponService.updateCoupon(coupon)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteAcoupon = createAsyncThunk(
  'coupon/delete-coupon',
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCoupons.pending, state => {
        state.isLoading = true
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.coupons = action.payload
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(createCoupons.pending, state => {
        state.isLoading = true
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdCoupon = action.payload
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getcoupon.pending, state => {
        state.isLoading = true
      })
      .addCase(getcoupon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.couponName = action.payload.name
        state.expiryName = action.payload.expiry
        state.discountName = action.payload.discount
      })
      .addCase(getcoupon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(updateAcoupon.pending, state => {
        state.isLoading = true
      })
      .addCase(updateAcoupon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updatecoupon = action.payload
        state.couponName = action.payload.name
        state.expiryName = action.payload.expiry
        state.discountName = action.payload.discount
      })
      .addCase(updateAcoupon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(deleteAcoupon.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteAcoupon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deletedcoupon = action.payload
      })
      .addCase(deleteAcoupon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(resetState, () => initialState)
  }
})
export default couponSlice.reducer
