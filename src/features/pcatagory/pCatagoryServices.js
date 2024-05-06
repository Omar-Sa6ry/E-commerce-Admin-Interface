import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const getpCatagories = async () => {
  const response = await axios.get(`${base_url}product-category/all-category`)
  return response.data
}

const getpCatagory = async id => {
  const response = await axios.get(`${base_url}product-category/${id}`)
  return response.data
}

const createpCatagory = async pCatagory => {
  const response = await axios.post(
    `${base_url}product-category/create-category`,
    pCatagory,
    config
  )
  return response.data
}

const updatepCatagory = async cat => {
  const response = await axios.put(
    `${base_url}product-category/${cat.id}`,
    { title: cat.catData.title },
    config
  )
  return response.data
}

const deletepCatagory = async id => {
  const response = await axios.delete(
    `${base_url}product-category/${id}`,
    config
  )
  return response.data
}

const pCatagorieservice = {
  getpCatagories,
  createpCatagory,
  getpCatagory,
  updatepCatagory,
  deletepCatagory
}

export default pCatagorieservice
