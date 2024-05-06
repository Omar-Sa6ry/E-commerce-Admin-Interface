import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authServices'
import orderservice from './authServices'
import { toast } from 'react-toastify'

const getUserfromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

export const login = createAsyncThunk(
  'auth/admin-login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getorders = createAsyncThunk(
  'order/get-orders',
  async thunkAPI => {
    try {
      return await orderservice.getorders()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getAnOrder = createAsyncThunk(
  'order/get-An-order',
  async (id, thunkAPI) => {
    try {
      return await orderservice.getAnorder(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateOrder = createAsyncThunk(
  'order/update-An-order',
  async (data, thunkAPI) => {
    try {
      return await orderservice.updateOrder(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getYearOrder = createAsyncThunk(
  'order/Get-Year-Order',
  async thunkAPI => {
    try {
      return await authService.getYearlylyOrder()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getMonthOrder = createAsyncThunk(
  'order/Get-Month-Order',
  async thunkAPI => {
    try {
      return await authService.getMonthlyOrder()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('Reset_all')

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: buildeer => {
    buildeer
      .addCase(login.pending, state => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true
        localStorage.setItem('token', action.payload.token)
        state.isError = false
        state.isLoading = false
        state.user = action.payload
        state.message = 'success'
        if (state.isSuccess) {
          window.location.reload()
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.messageError = action.payload
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getorders.pending, state => {
        state.isLoading = true
      })
      .addCase(getorders.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
        state.message = 'success'
      })
      .addCase(getorders.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        state.isLoading = false
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getAnOrder.pending, state => {
        state.isLoading = true
      })
      .addCase(getAnOrder.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.SingleOrder = action.payload
        state.orderStatus = action.payload.status
        state.message = 'success'
      })
      .addCase(getAnOrder.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        state.isLoading = false
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(updateOrder.pending, state => {
        state.isLoading = true
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.UpdateOrder = action.payload
        state.message = 'success'
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        state.isLoading = false
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getYearOrder.pending, state => {
        state.isLoading = true
      })
      .addCase(getYearOrder.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.YearlyData = action.payload
      })
      .addCase(getYearOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
        state.message = action.error
      })
      .addCase(getMonthOrder.pending, state => {
        state.isLoading = true
      })
      .addCase(getMonthOrder.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.MonthlyData = action.payload
      })
      .addCase(getMonthOrder.rejected, (state, action) => {
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

export default authSlice.reducer
