import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import brandService from './brandServices'
import { toast } from 'react-toastify'

export const getBrands = createAsyncThunk(
  'brand/get-brands',
  async thunkAPI => {
    try {
      return await brandService.getBrands()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const createBrands = createAsyncThunk(
  'brand/create-brand',
  async (brandData, thunkAPI) => {
    try {
      return await brandService.createBrand(brandData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getABrand = createAsyncThunk(
  'brand/get-brand',
  async (id, thunkAPI) => {
    try {
      return await brandService.getBrand(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateABrand = createAsyncThunk(
  'brand/update-brand',
  async (brand, thunkAPI) => {
    try {
      return await brandService.updateBrand(brand)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteAbrand = createAsyncThunk(
  'brand/delete-brand',
  async (id, thunkAPI) => {
    try {
      return await brandService.deleteBrand(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBrands.pending, state => {
        state.isLoading = true
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.brands = action.payload
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(createBrands.pending, state => {
        state.isLoading = true
      })
      .addCase(createBrands.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdBrand = action.payload
      })
      .addCase(createBrands.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getABrand.pending, state => {
        state.isLoading = true
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.brandName = action.payload.title
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(updateABrand.pending, state => {
        state.isLoading = true
      })
      .addCase(updateABrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateBrand = action.payload
      })
      .addCase(updateABrand.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(deleteAbrand.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteAbrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deletedbrand = action.payload
      })
      .addCase(deleteAbrand.rejected, (state, action) => {
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
export default brandSlice.reducer
