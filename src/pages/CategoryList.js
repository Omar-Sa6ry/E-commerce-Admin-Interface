import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import CustomModel from '../components/CustomModel'
import EditDelete from '../components/Edit&Delete'
import {
  deleteApCat,
  getpCatagories,
  resetState
} from '../features/pcatagory/pCatagorySlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Name',
    dataIndex: 'title',
    sorter: (a, b) => a?.title?.length - b?.title?.length
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const PCatagoryList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getpCatagories())
  }, [])

  const [open, setOpen] = useState(false)
  const [catId, setcatId] = useState('')
  const dataTable = []

  const showModal = e => {
    setOpen(true)
    setcatId(e)
  }
  const hideModal = () => {
    setOpen(false)
  }

  const pCatagoryState = useSelector(state => state?.pcatagory?.pCatagories)
  const gcat = useSelector(state => state?.pcatagory)
  const { isSuccess, isError } = gcat

  for (let i = 0; i < pCatagoryState?.length; i++) {
    dataTable.push({
      key: i + 1,
      title: pCatagoryState[i]?.title,
      action: (
        <EditDelete
          Edit={`/admin/category/${pCatagoryState[i]?._id}`}
          onClick={() => showModal(pCatagoryState[i]?._id)}
        />
      )
    })
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getpCatagories())
  }, [])

  const deletecat = e => {
    if (isSuccess) {
      toast.success(`Category Deleted Successfullly!`)
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(deleteApCat(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getpCatagories())
    }, TIMETOAST)
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>Products Categories</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
        <CustomModel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deletecat(catId)
          }}
          title='Are you sure you want to delete this Category ?'
        />
      </div>
    </>
  )
}

export default PCatagoryList
