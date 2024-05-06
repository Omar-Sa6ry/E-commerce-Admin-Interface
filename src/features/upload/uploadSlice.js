import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import uploadImgservices from './uploadServices'
import { toast } from 'react-toastify'

export const uploadImages = createAsyncThunk(
  'upload/images',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData()
      for (let i = 0; i < data.length; i++) {
        formData.append('images', data[i])
      }
      return await uploadImgservices.uploadImg(formData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const delImg = createAsyncThunk(
  'delete/images',
  async (id, thunkAPI) => {
    try {
      return await uploadImgservices.deleteImg(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const uploadSlice = createSlice({
  name: 'imaegs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadImages.pending, state => {
        state.isLoading = true
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.images = action.payload
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(delImg.pending, state => {
        state.isLoading = true
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.images = []
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
  }
})
export default uploadSlice.reducer
