import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`, config)
  return response.data
}

const customerService = {
  getUsers
}

export default customerService
