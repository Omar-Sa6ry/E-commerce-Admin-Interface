import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getorders, updateOrder } from '../features/auth/authSlice'
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
    title: 'Product',
    dataIndex: 'product',
    sorter: (a, b) => a?.product?.length - b?.product?.length
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a?.amount - b?.amount
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => a?.date - b?.date
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Orders = () => {
  const dispatch = useDispatch()

  const orderState = useSelector(state => state?.auth?.orders?.orders)

  useEffect(() => {
    dispatch(getorders())
  }, [])

  const dataTable = []
  for (let i = 0; i < orderState?.length; i++) {
    dataTable.push({
      key: i + 1,
      name:
        orderState[0]?.user?.firstname + ' ' + orderState[0]?.user?.lastname,
      product: (
        <Link to={`/admin/order/${orderState[0]?._id}`}>View Orders</Link>
      ),
      amount: orderState[i]?.orderItems?.length,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <select
          name=''
          defaultValue={
            orderState[i]?.status ? orderState[i]?.status : 'Submitted'
          }
          className='form-control form-select'
          id=''
          onChange={e =>
            dispatch(
              updateOrder({ id: orderState[i]?._id, status: e.target.value })
            )
          }
        >
          <option value='state'>{orderState[i]?.orderStatus}</option>
          <option value='Processed'>Processed</option>
          <option value='Shipped'>Shipped</option>
          <option value='Out Of Delivery'>Out Of Delivery</option>
          <option value='Delevered'>Delevered</option>
        </select>
      )
    })
  }

  return (
    <>
      <div className=' mt-4'>
        <h3 className='mb-4'>Orders</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
      </div>
    </>
  )
}

export default Orders
