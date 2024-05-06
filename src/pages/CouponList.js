import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import CustomModel from '../components/CustomModel'
import EditDelete from '../components/Edit&Delete'
import {
  deleteAcoupon,
  getCoupons,
  resetState
} from '../features/coupon/couponSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Name',
    dataIndex: 'title',
    sorter: (a, b) => a?.name?.length - b?.name?.length
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter: (a, b) => a?.expiry?.length - b?.expiry?.length
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a, b) => a?.discount?.length - b?.discount?.length
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const CouponList = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [couponId, setcouponId] = useState('')
  const dataTable = []

  const showModal = e => {
    setOpen(true)
    setcouponId(e)
  }
  const hideModal = () => {
    setOpen(false)
  }

  const couponState = useSelector(state => state?.coupon?.coupons)
  const gcoupon = useSelector(state => state?.coupon)
  const { isSuccess, isError } = gcoupon

  for (let i = 0; i < couponState?.length; i++) {
    dataTable.push({
      key: i + 1,
      title: couponState[i]?.name,
      expiry: new Date(couponState[i]?.expiry).toLocaleString(),
      discount: couponState[i]?.discount,
      action: (
        <EditDelete
          Edit={`/admin/coupon/${couponState[i]?._id}`}
          onClick={() => showModal(couponState[i]._id)}
        />
      )
    })
  }

  useEffect(() => {
    dispatch(resetState())
    dispatch(getCoupons())
  }, [])

  const deletecoupon = e => {
    if (isSuccess) {
      toast.success(`Coupon Deleted Successfullly!`)
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(deleteAcoupon(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getCoupons())
    }, TIMETOAST)
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>Coupon List</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
        <CustomModel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deletecoupon(couponId)
          }}
          title='Are you sure you want to delete this coupon?'
        />
      </div>
    </>
  )
}

export default CouponList
