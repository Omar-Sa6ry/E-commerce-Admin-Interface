import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const getblogCats = async () => {
  const response = await axios.get(`${base_url}blog-category/all-category`)
  return response.data
}

const createblogCat = async blogCat => {
  const response = await axios.post(
    `${base_url}blog-category/create-category`,
    blogCat,
    config
  )
  return response.data
}

const getblogCat = async id => {
  const response = await axios.get(`${base_url}blog-category/${id}`)
  return response.data
}

const updateblogCat = async blogCat => {
  const response = await axios.put(
    `${base_url}blog-category/${blogCat.id}`,
    { title: blogCat.categoryData.title },
    config
  )
  return response.data
}

const deleteblogCat = async id => {
  const response = await axios.delete(`${base_url}blog-category/${id}`, config)
  return response.data
}

const blogCatservice = {
  getblogCats,
  createblogCat,
  getblogCat,
  updateblogCat,
  deleteblogCat
}

export default blogCatservice
