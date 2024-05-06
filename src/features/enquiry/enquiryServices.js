import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/ConfigAxios'

const getenquiries = async () => {
  const response = await axios.get(`${base_url}enquiry`)
  return response.data
}
const createenquiry = async enquiry => {
  const response = await axios.post(
    `${base_url}enquiry/create-enquiry`,
    enquiry,
    config
  )
  return response.data
}

const getenquiry = async id => {
  const response = await axios.get(`${base_url}enquiry/${id}`)
  return response.data
}

const updateenquiry = async enquiry => {
  const response = await axios.put(
    `${base_url}enquiry/${enquiry?.id}`,
    { status: enquiry?.enquiryData },
    config
  )
  return response.data
}

const deleteenquiry = async id => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, config)
  return response.data
}

const enquirieservice = {
  getenquiries,
  createenquiry,
  getenquiry,
  updateenquiry,
  deleteenquiry
}

export default enquirieservice
