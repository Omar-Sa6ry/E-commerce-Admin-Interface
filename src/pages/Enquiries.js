import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import CustomModel from '../components/CustomModel'
import {
  getenquiries,
  deleteAenquiry,
  updateAenquiry
} from '../features/enquiry/enquirySlice'
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a?.name?.length - b?.name?.length
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a?.email?.length - b?.email?.length
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    sorter: (a, b) => a?.mobile?.length - b?.mobile?.length
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    sorter: (a, b) => a?.comment?.length - b?.comment?.length
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => a?.status?.length - b?.status?.length
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Enquiries = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [enquiryId, setenquiryId] = useState('')
  const dataTable = []

  const showModal = e => {
    setOpen(true)
    setenquiryId(e)
  }
  const hideModal = () => {
    setOpen(false)
  }

  const enquiriestate = useSelector(state => state?.enquiry?.enquiries)
  const genquiry = useSelector(state => state?.enquiry)
  const { isSuccess, isError } = genquiry

  for (let i = 0; i < enquiriestate?.length; i++) {
    dataTable.push({
      key: i + 1,
      name: enquiriestate[i]?.name,
      email: enquiriestate[i]?.email,
      mobile: enquiriestate[i]?.mobile,
      comment: enquiriestate[i]?.comment,
      status: (
        <>
          <select
            name=''
            defaultValue={
              enquiriestate[i]?.status ? enquiriestate[i]?.status : 'Submitted'
            }
            className='form-control form-select'
            id=''
            onChange={e =>
              setEnquiryStatus(e.target.value, enquiriestate[i]?._id)
            }
          >
            <option value='Submitted'>Submitted</option>
            <option value='Contacted'>Contacted</option>
            <option value='In Progress'>In Progress</option>
            <option value='Resolved'>Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className='ms-3 fs-3 text-danger statusEnq'
            to={`/admin/enquiries/${enquiriestate[i]?._id}`}
          >
            <AiOutlineEye />
          </Link>

          <button
            onClick={() => showModal(enquiriestate[i]?._id)}
            className='ms-3 fs-3 text-danger border-0 bg-transparent'
          >
            <AiFillDelete />
          </button>
        </>
      )
    })
  }
  useEffect(() => {
    dispatch(getenquiries())
  }, [])

  const deleteenquiry = e => {
    if (isSuccess) {
      toast.success(`Enquiry Deleted Successfullly!`)
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(deleteAenquiry(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getenquiries())
    }, TIMETOAST)
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enquiryData: e }
    dispatch(updateAenquiry(data))
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>Enquires</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
        <CustomModel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteenquiry(enquiryId)
          }}
          title='Are you sure you want to delete this Enquiry?'
        />
      </div>
    </>
  )
}

export default Enquiries
