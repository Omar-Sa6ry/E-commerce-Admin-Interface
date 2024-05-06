import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getenquiry,
  resetState,
  updateAenquiry
} from '../features/enquiry/enquirySlice'
import { BiArrowBack } from 'react-icons/bi'

const ViewEnq = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const newEnquiry = useSelector(state => state?.enquiry)
  const {
    enquiryName,
    enquiryEmail,
    enquiryMobile,
    enquiryStatus,
    enquiryComment
  } = newEnquiry

  // Get Id
  const getId = location?.pathname?.split('/')[3]
  useEffect(() => {
    if (getId) {
      dispatch(getenquiry(getId))
    } else {
      dispatch(resetState())
    }
  }, [getId])

  const goBack = () => {
    navigate(-1)
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enquiryData: e }
    dispatch(updateAenquiry(data))
    setTimeout(() => {
      dispatch(getenquiry(getId))
    }, 100)
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='mb-4 title'>View Enquiry</h3>
        <button
          className='bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1'
          onClick={goBack}
        >
          <BiArrowBack className='fs-5' /> Go Back
        </button>
      </div>
      <div className='mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3'>
        <div className='d-flex align-items-center gap-3'>
          <h6 className='mb-0'>Name:</h6>
          <p className='mb-0'>{enquiryName}</p>
        </div>
        <div className='d-flex align-items-center gap-3'>
          <h6 className='mb-0'>Mobile:</h6>
          <p className='mb-0'>
            <a className='aInEnq' href={`tel:+20${enquiryMobile}`}>
              {enquiryMobile}
            </a>
          </p>
        </div>
        <div className='d-flex align-items-center gap-3'>
          <h6 className='mb-0'>Email:</h6>
          <p className='mb-0'>
            <a className='aInEnq' href={`mailto:{enqEmail}`}>
              {enquiryEmail}
            </a>
          </p>
        </div>
        <div className='d-flex align-items-center gap-3'>
          <h6 className='mb-0'>Comment:</h6>
          <p className='mb-0'>{enquiryComment}</p>
        </div>
        <div className='d-flex align-items-center gap-3'>
          <h6 className='mb-0'>Status:</h6>
          <p className='mb-0'>{enquiryStatus}</p>
        </div>
        <div className='d-flex align-items-center gap-3'>
          <h6 className='mb-0'>Change Status:</h6>
          <div>
            <select
              name=''
              defaultValue={enquiryStatus ? enquiryStatus : 'Submitted'}
              className='form-control form-select statusEnq'
              id=''
              onChange={e => setEnquiryStatus(e.target.value, getId)}
            >
              <option value='Submitted'>Submitted</option>
              <option value='Contacted'>Contacted</option>
              <option value='In Progress'>In Progress</option>
              <option value='Resolved'>Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewEnq
