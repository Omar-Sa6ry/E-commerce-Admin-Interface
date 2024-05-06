import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAnOrder, getorder } from '../features/auth/authSlice'
import { useLocation } from 'react-router-dom'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Product Name',
    dataIndex: 'name'
  },
  {
    title: 'Brand',
    dataIndex: 'brand'
  },
  {
    title: 'Count',
    dataIndex: 'count'
  },

  {
    title: 'Price',
    dataIndex: 'price'
  },
  {
    title: 'Color',
    dataIndex: 'color'
  },
  {
    title: 'Date',
    dataIndex: 'date'
  }
]

const ViewOrder = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const getId = location?.pathname?.split('/')[3]

  useEffect(() => {
    dispatch(getAnOrder(getId))
  }, [])

  const orderState = useSelector(state => state?.auth?.SingleOrder?.order)
  const dataTable = []

  console.log(orderState)

  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    dataTable?.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.productId?.title,
      brand: orderState?.orderItems[i]?.productId?.brand,
      count: orderState?.orderItems[i]?.productId?.quantity,
      price: orderState?.orderItems[i]?.productId?.price,
      color: orderState?.orderItems[i]?.productId?.color,
      date: orderState?.orderItems[i]?.productId?.createdAt
    })
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>view Order</h3>
        <div>
          <Table
            columns={columns}
            dataSource={dataTable}
            scroll={{
              x: 1300
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ViewOrder
