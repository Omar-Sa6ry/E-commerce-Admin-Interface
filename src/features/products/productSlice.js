import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import productService from './productServices'
import { toast } from 'react-toastify'

export const getAproducts = createAsyncThunk(
  'product/get-products',
  async thunkAPI => {
    try {
      return await productService.getProducts()
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const createProducts = createAsyncThunk(
  'product/create-product',
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const getAproduct = createAsyncThunk(
  'product/get-product',
  async (id, thunkAPI) => {
    try {
      return await productService.getproduct(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateAproduct = createAsyncThunk(
  'product/update-product',
  async (product, thunkAPI) => {
    try {
      return await productService.updateproduct(product)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteAproduct = createAsyncThunk(
  'product/delete-product',
  async (id, thunkAPI) => {
    try {
      return await productService.deleteproduct(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const resetState = createAction('Reset_all')

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAproducts.pending, state => {
        state.isLoading = true
      })
      .addCase(getAproducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getAproducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(createProducts.pending, state => {
        state.isLoading = true
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.createdProduct = action.payload
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(getAproduct.pending, state => {
        state.isLoading = true
      })
      .addCase(getAproduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.productName = action.payload.title
        state.productColor = action.payload.color
        state.productBrand = action.payload.brand
        state.productPrice = action.payload.price
        state.productQuantity = action.payload.quantity
        state.productImage = action.payload.images
        state.productDesc = action.payload.description
        state.productTags = action.payload.tags
        state.productCat = action.payload.category
      })
      .addCase(getAproduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(updateAproduct.pending, state => {
        state.isLoading = true
      })
      .addCase(updateAproduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.updateproduct = action.payload
      })
      .addCase(updateAproduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message)
        }
      })
      .addCase(deleteAproduct.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteAproduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.deletedproduct = action.payload
      })
      .addCase(deleteAproduct.rejected, (state, action) => {
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
export default productSlice.reducer
