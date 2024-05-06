import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteAcolor,
  getcolors,
  resetState
} from '../features/color/colorSlice'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import CustomModel from '../components/CustomModel'
import EditDelete from '../components/Edit&Delete'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Color',
    dataIndex: 'title',
    sorter: (a, b) => a?.title?.length - b?.title?.length
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const ColorsList = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [colorId, setcolorId] = useState('')
  const dataTable = []

  const showModal = e => {
    setOpen(true)
    setcolorId(e)
  }
  const hideModal = () => {
    setOpen(false)
  }

  const colorState = useSelector(state => state?.color?.colors)
  const gColor = useSelector(state => state?.color)
  const { isSuccess, isError } = gColor

  for (let i = 0; i < colorState?.length; i++) {
    dataTable.push({
      key: i + 1,
      title: colorState[i]?.title,
      action: (
        <EditDelete
          Edit={`/admin/color/${colorState[i]?._id}`}
          onClick={() => showModal(colorState[i]?._id)}
        />
      )
    })
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getcolors())
  }, [])

  const deleteColor = e => {
    if (isSuccess) {
      toast.success(`Color Deleted Successfullly!`)
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(deleteAcolor(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getcolors())
    }, TIMETOAST)
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>Products Colors</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId)
        }}
        title='Are you sure you want to delete this color ?'
      />
    </>
  )
}

export default ColorsList
