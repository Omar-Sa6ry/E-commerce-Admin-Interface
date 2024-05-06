import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const getcolors = async () => {
  const response = await axios.get(`${base_url}color/all-color`)
  return response.data
}

const createcolor = async color => {
  const response = await axios.post(
    `${base_url}color/create-color`,
    color,
    config
  )
  return response.data
}

const getcolor = async id => {
  const response = await axios.get(`${base_url}color/${id}`)
  return response.data
}

const updatecolor = async color => {
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title },
    config
  )
  return response.data
}

const deletecolor = async id => {
  const response = await axios.delete(`${base_url}color/${id}`, config)
  return response.data
}

const colorservice = {
  getcolors,
  createcolor,
  getcolor,
  updatecolor,
  deletecolor
}

export default colorservice
