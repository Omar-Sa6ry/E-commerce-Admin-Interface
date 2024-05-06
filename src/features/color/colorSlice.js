import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import colorservice from './colorServices'
import { toast } from 'react-toastify'

export const getcolors = createAsyncThunk(
  'color/get-colors',
  async thunkAPI => {
    try {
      return await colorservice.getcolors()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const createcolors = createAsyncThunk(
  'color/create-color',
  async (colorData, thunkAPI) => {
    try {
      return await colorservice.createcolor(colorData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getcolor = createAsyncThunk(
  'color/get-color',
  async (id, thunkAPI) => {
    try {
      return await colorservice.getcolor(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateAcolor = createAsyncThunk(
  'color/update-color',
  async (color, thunkAPI) => {
    try {
      return await colorservice.updatecolor(color)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteAcolor = createAsyncThunk(
  'color/delete-color',
  async (id, thunkAPI) => {
    try {
      return await colorservice.deletecolor(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const colorslice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getcolors.pending, state => {
        state.isLoading = true
      })
      .addCase(getcolors.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.colors = action.payload
      })
      .addCase(getcolors.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(createcolors.pending, state => {
        state.isLoading = true
      })
      .addCase(createcolors.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdcolor = action.payload
      })
      .addCase(createcolors.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getcolor.pending, state => {
        state.isLoading = true
      })
      .addCase(getcolor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.colorName = action.payload.title
      })
      .addCase(getcolor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(updateAcolor.pending, state => {
        state.isLoading = true
      })
      .addCase(updateAcolor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updatecolor = action.payload
      })
      .addCase(updateAcolor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(deleteAcolor.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteAcolor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deletedColor = action.payload
      })
      .addCase(deleteAcolor.rejected, (state, action) => {
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
export default colorslice.reducer
