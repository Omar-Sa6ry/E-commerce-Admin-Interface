import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import CustomModel from '../components/CustomModel'
import EditDelete from '../components/Edit&Delete'
import {
  deleteAblogCat,
  getblogCats,
  resetState
} from '../features/blogCat/blogCatSlice'

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
    title: 'Action',
    dataIndex: 'action'
  }
]

const BlogCatList = () => {
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

  const blogCatState = useSelector(state => state?.blogCat?.blogCats)
  const gcat = useSelector(state => state?.blogCat)
  const { isSuccess, isError } = gcat

  for (let i = 0; i < blogCatState?.length; i++) {
    dataTable?.push({
      key: i + 1,
      name: blogCatState[i]?.title,
      action: (
        <EditDelete
          Edit={`/admin/blog-category/${blogCatState[i]?._id}`}
          onClick={() => showModal(blogCatState[i]?._id)}
        />
      )
    })
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetState())
    dispatch(getblogCats())
  }, [])

  useEffect(() => {
    dispatch(getblogCats())
  }, [])

  const deletecat = e => {
    if (isSuccess) {
      toast.success(`Category Deleted Successfullly!`)
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(deleteAblogCat(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getblogCats())
    }, TIMETOAST)
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>Blog Categories</h3>
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

export default BlogCatList
