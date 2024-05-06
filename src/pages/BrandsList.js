import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import CustomModel from '../components/CustomModel'
import EditDelete from '../components/Edit&Delete'
import {
  deleteAbrand,
  getBrands,
  resetState
} from '../features/brand/brandSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a?.title?.length - b?.title?.length
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const BrandList = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [brandId, setbrandId] = useState('')
  const dataTable = []

  const showModal = e => {
    setOpen(true)
    setbrandId(e)
  }
  const hideModal = () => {
    setOpen(false)
  }

  const brandState = useSelector(state => state?.brand?.brands)
  const gbrand = useSelector(state => state?.brand)
  const { isSuccess, isError } = gbrand

  for (let i = 0; i < brandState?.length; i++) {
    dataTable.push({
      key: i + 1,
      title: brandState[i]?.title,
      action: (
        <EditDelete
          Edit={`/admin/brand/${brandState[i]?._id}`}
          onClick={() => showModal(brandState[i]?._id)}
        />
      )
    })
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getBrands())
  }, [])

  const deletebrand = e => {
    if (isSuccess) {
      toast.success(`brand Deleted Successfullly!`)
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(deleteAbrand(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getBrands())
    }, TIMETOAST)
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>Brands List</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
        <CustomModel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deletebrand(brandId)
          }}
          title='Are you sure you want to delete this Brand ?'
        />
      </div>
    </>
  )
}
export default BrandList
