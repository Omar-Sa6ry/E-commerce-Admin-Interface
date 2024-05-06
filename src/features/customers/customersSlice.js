import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './custonersServices'
import { toast } from 'react-toastify'

export const getUsers = createAsyncThunk('user/get-users', async thunkAPI => {
  try {
    return await customerService.getUsers()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const customerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.customers = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
  }
})
export default customerSlice.reducer
