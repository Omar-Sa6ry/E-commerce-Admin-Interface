import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const getblogs = async () => {
  const response = await axios.get(`${base_url}blog/all-blogs`)
  return response.data
}

const createblog = async blog => {
  const response = await axios.post(`${base_url}blog/create-blog`, blog, config)
  return response.data
}

const getblog = async id => {
  const response = await axios.get(`${base_url}blog/${id}`)
  return response.data
}

const updateblog = async blog => {
  const response = await axios.put(
    `${base_url}blog/${blog?.id}`,
    {
      title: blog?.blogData?.title,
      description: blog?.blogData?.description,
      category: blog?.blogData?.category
    },
    config
  )
  return response.data
}

const deleteblog = async id => {
  const response = await axios.delete(`${base_url}blog/${id}`, config)
  return response.data
}

const blogservice = {
  getblogs,
  createblog,
  getblog,
  updateblog,
  deleteblog
}

export default blogservice
