import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/customers/customersSlice'
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
    dataIndex: 'email'
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile'
  }
]

const Customers = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const customerState = useSelector(state => state?.customer?.customers)
  const dataTable = []

  for (let i = 0; i < customerState?.length; i++) {
    dataTable.push({
      key: i + 1,
      name: customerState[i]?.firstname + ' ' + customerState[i]?.lastname,
      email: customerState[i]?.email,
      mobile: customerState[i]?.mobile
    })
  }

  return (
    <div>
      <h3 className='mb-4 title'>Customers</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  )
}

export default Customers
