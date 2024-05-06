import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import enquiryServices from './enquiryServices'
import { toast } from 'react-toastify'

export const getenquiries = createAsyncThunk(
  'enquiry/get-enquiries',
  async thunkAPI => {
    try {
      return await enquiryServices.getenquiries()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const createenquiries = createAsyncThunk(
  'enquiry/create-enquiry',
  async (enquiryData, thunkAPI) => {
    try {
      return await enquiryServices.createenquiry(enquiryData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getenquiry = createAsyncThunk(
  'enquiry/get-enquiry',
  async (id, thunkAPI) => {
    try {
      return await enquiryServices.getenquiry(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateAenquiry = createAsyncThunk(
  'enquiry/update-enquiry',
  async (enquiry, thunkAPI) => {
    try {
      return await enquiryServices.updateenquiry(enquiry)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteAenquiry = createAsyncThunk(
  'enquiry/delete-enquiry',
  async (id, thunkAPI) => {
    try {
      return await enquiryServices.deleteenquiry(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const enquirieslice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getenquiries.pending, state => {
        state.isLoading = true
      })
      .addCase(getenquiries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.enquiries = action.payload
      })
      .addCase(getenquiries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(createenquiries.pending, state => {
        state.isLoading = true
      })
      .addCase(createenquiries.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdenquiry = action.payload
      })
      .addCase(createenquiries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getenquiry.pending, state => {
        state.isLoading = true
      })
      .addCase(getenquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.enquiryName = action.payload.name
        state.enquiryEmail = action.payload.email
        state.enquiryMobile = action.payload.mobile
        state.enquiryStatus = action.payload.status
        state.enquiryComment = action.payload.comment
      })
      .addCase(getenquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(updateAenquiry.pending, state => {
        state.isLoading = true
      })
      .addCase(updateAenquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateenquiry = action.payload
      })
      .addCase(updateAenquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(deleteAenquiry.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteAenquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deletedenquiry = action.payload
      })
      .addCase(deleteAenquiry.rejected, (state, action) => {
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
export default enquirieslice.reducer
