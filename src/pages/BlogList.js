import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import CustomModel from '../components/CustomModel'
import EditDelete from '../components/Edit&Delete'
import { deleteAblog, getblogs } from '../features/blog/blogSlice'
import { resetState } from '../features/blogCat/blogCatSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Blog',
    dataIndex: 'title',
    sorter: (a, b) => a?.title?.length - b?.title?.length
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a?.category?.length - b?.category?.length
  },
  {
    title: 'Author',
    dataIndex: 'author',
    sorter: (a, b) => a?.author?.length - b?.author?.length
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const BlogList = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [blogId, setblogId] = useState('')
  const dataTable = []

  const showModal = e => {
    setOpen(true)
    setblogId(e)
  }
  
  const hideModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getblogs())
  }, [])

  const blogState = useSelector(state => state?.blog?.blogs)
  const gBlog = useSelector(state => state?.blog)
  const { isSuccess, isError } = gBlog

  for (let i = 0; i < blogState?.length; i++) {
    dataTable.push({
      key: i + 1,
      title: blogState[i]?.title,
      author: blogState[i]?.author,
      category: blogState[i]?.category,
      action: (
        <EditDelete
          Edit={`/admin/blog/${blogState[i]?._id}`}
          onClick={() => showModal(blogState[i]?._id)}
        />
      )
    })
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getblogs())
  }, [])

  const deleteBlog = e => {
    if (isSuccess) {
      toast.success(`Blog Deleted Successfullly!`)
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(deleteAblog(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getblogs())
    }, TIMETOAST)
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>Blog List</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
        
        <CustomModel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBlog(blogId)
          }}
          title='Are you sure you want to delete this Blog?'
        />
      </div>
    </>
  )
}

export default BlogList
