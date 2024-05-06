import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import pCatagorieservice from './pCatagoryServices'
import { toast } from 'react-toastify'

export const getpCatagories = createAsyncThunk(
  'pCatagory/get-pCatagories',
  async thunkAPI => {
    try {
      return await pCatagorieservice.getpCatagories()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const createpCatagories = createAsyncThunk(
  'pCatagory/create-pCatagories',
  async (pCatagoryData, thunkAPI) => {
    try {
      return await pCatagorieservice.createpCatagory(pCatagoryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getcat = createAsyncThunk(
  'pCatagory/get-pCatagory',
  async (pCatagoryData, thunkAPI) => {
    try {
      return await pCatagorieservice.getpCatagory(pCatagoryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateAcat = createAsyncThunk(
  'pCatagory/update-pCatagory',
  async (pCatagoryData, thunkAPI) => {
    try {
      return await pCatagorieservice.updatepCatagory(pCatagoryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteApCat = createAsyncThunk(
  'pCatagory/delete-pCatagory',
  async (id, thunkAPI) => {
    try {
      return await pCatagorieservice.deletepCatagory(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

const initialState = {
  pCatagories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const pCatagorieslice = createSlice({
  name: 'pCatagories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getpCatagories.pending, state => {
        state.isLoading = true
      })
      .addCase(getpCatagories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.pCatagories = action.payload
      })
      .addCase(getpCatagories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(createpCatagories.pending, state => {
        state.isLoading = true
      })
      .addCase(createpCatagories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdpCatagory = action.payload
      })
      .addCase(createpCatagories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getcat.pending, state => {
        state.isLoading = true
      })
      .addCase(getcat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.catName = action.payload.title
      })
      .addCase(getcat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(updateAcat.pending, state => {
        state.isLoading = true
      })
      .addCase(updateAcat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateCat = action.payload
      })
      .addCase(updateAcat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(deleteApCat.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteApCat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deletedpCat = action.payload
      })
      .addCase(deleteApCat.rejected, (state, action) => {
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
export default pCatagorieslice.reducer
