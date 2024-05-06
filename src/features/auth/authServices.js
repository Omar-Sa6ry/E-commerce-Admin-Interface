import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const login = async user => {
  const response = await axios.post(`${base_url}user/admin-login`, user)
  if (response.data) {
localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const getorders = async () => {
  const response = await axios.get(`${base_url}user/order/getAllorder`, config)
  return response.data
}

const getAnorder = async id => {
  const response = await axios.get(
    `${base_url}user/order/getASingleorder/${id}`,
    config
  )
  return response.data
}

const updateOrder = async data => {
  const response = await axios.put(
    `${base_url}user/order/update-order/${data.id}`,
    {status:data?.status},
    config
  )
  return response.data
}

const getYearlylyOrder = async () => {
  const response = await axios.get(
    `${base_url}user/order/getYearlyOrders`,
    config
  )
  if (response.data) {
    return response.data
  }
}

const getMonthlyOrder = async () => {
  const response = await axios.get(
    `${base_url}user/order/getMonthWithOrders`,
    config
  )
  if (response.data) {
    return response.data
  }
}

const authService = {
  login,
  getorders,
  getAnorder,
  updateOrder,
  getYearlylyOrder,
  getMonthlyOrder
}

export default authService
