import axios from 'axios'
import { config } from '../../utils/ConfigAxios'
import { base_url } from '../../utils/base_url'

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/all-products`)
  return response.data
}

const createProduct = async product => {
  const response = await axios.post(
    `${base_url}product/create-product`,
    product,
    config
  )
  return response.data
}

const getproduct = async id => {
  const response = await axios.get(`${base_url}product/${id}`,config)
  return response.data
}

const updateproduct = async product => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      quantity: product.productData.quantity,
      tags: product.productData.tags,
      brand: product.productData.brand,
      category: product.productData.category,
      price: product.productData.price,
      color: product.productData.color,
      images: product.productData.images
    },
    config
  )
  return response.data
}

const deleteproduct = async id => {
  const response = await axios.delete(`${base_url}product/${id}`, config)
  return response.data
}

const productService = {
  getProducts,
  createProduct,
  getproduct,
  updateproduct,
  deleteproduct
}

export default productService
