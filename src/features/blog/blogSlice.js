import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import blogservice from './blogServices'
import { toast } from 'react-toastify'

export const getblogs = createAsyncThunk('blog/get-blogs', async thunkAPI => {
  try {
    return await blogservice.getblogs()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const createblogs = createAsyncThunk(
  'blog/create-blog',
  async (blogData, thunkAPI) => {
    try {
      return await blogservice.createblog(blogData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getblog = createAsyncThunk(
  'blog/get-blog',
  async (id, thunkAPI) => {
    try {
      return await blogservice.getblog(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateAblog = createAsyncThunk(
  'blog/update-blog',
  async (blog, thunkAPI) => {
    try {
      return await blogservice.updateblog(blog)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteAblog = createAsyncThunk(
  'blog/delete-blog',
  async (id, thunkAPI) => {
    try {
      return await blogservice.deleteblog(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const blogslice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getblogs.pending, state => {
        state.isLoading = true
      })
      .addCase(getblogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogs = action.payload
      })
      .addCase(getblogs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
        state.message = action.error
      })
      .addCase(createblogs.pending, state => {
        state.isLoading = true
      })
      .addCase(createblogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdblog = action.payload
      })
      .addCase(createblogs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getblog.pending, state => {
        state.isLoading = true
      })
      .addCase(getblog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.blogName = action.payload.title
        state.blogDesc = action.payload.description
        state.blogImage = action.payload.images
        state.blogCat = action.payload.category
      })
      .addCase(getblog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
        state.message = action.error
      })
      .addCase(updateAblog.pending, state => {
        state.isLoading = true
      })
      .addCase(updateAblog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateblog = action.payload
      })
      .addCase(updateAblog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(deleteAblog.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteAblog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deletedblog = action.payload
      })
      .addCase(deleteAblog.rejected, (state, action) => {
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
export default blogslice.reducer
