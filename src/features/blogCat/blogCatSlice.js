import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import blogCatservice from './blogCatServices'
import { toast } from 'react-toastify'

export const getblogCats = createAsyncThunk(
  'blogCat/get-blogCats',
  async thunkAPI => {
    try {
      return await blogCatservice.getblogCats()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const createblogCats = createAsyncThunk(
  'blogCat/create-blogCat',
  async (blogCatData, thunkAPI) => {
    try {
      return await blogCatservice.createblogCat(blogCatData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getblogCat = createAsyncThunk(
  'blogCat/get-blogCat',
  async (id, thunkAPI) => {
    try {
      return await blogCatservice.getblogCat(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateAblogCat = createAsyncThunk(
  'blogCat/update-blogCat',
  async (blogCat, thunkAPI) => {
    try {
      return await blogCatservice.updateblogCat(blogCat)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteAblogCat = createAsyncThunk(
  'blogCat/delete-blogCat',
  async (id, thunkAPI) => {
    try {
      return await blogCatservice.deleteblogCat(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

const initialState = {
  blogCats: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const blogCatslice = createSlice({
  name: 'blogCats',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getblogCats.pending, state => {
        state.isLoading = true
      })
      .addCase(getblogCats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogCats = action.payload
      })
      .addCase(getblogCats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(createblogCats.pending, state => {
        state.isLoading = true
      })
      .addCase(createblogCats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdblogCat = action.payload
      })
      .addCase(createblogCats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getblogCat.pending, state => {
        state.isLoading = true
      })
      .addCase(getblogCat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogCatName = action.payload.title
      })
      .addCase(getblogCat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(updateAblogCat.pending, state => {
        state.isLoading = true
      })
      .addCase(updateAblogCat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateblogCat = action.payload
      })
      .addCase(updateAblogCat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(deleteAblogCat.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteAblogCat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deletedblogCat = action.payload
      })
      .addCase(deleteAblogCat.rejected, (state, action) => {
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
export default blogCatslice.reducer
