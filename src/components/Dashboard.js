import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Column } from '@ant-design/plots'
import { Table } from 'antd'
import {
  getMonthOrder,
  getYearOrder,
  getorders
} from '../features/auth/authSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Product',
    dataIndex: 'productC'
  },
  {
    title: 'Total Price',
    dataIndex: 'price'
  },
  {
    title: 'Total Price After Discount',
    dataIndex: 'dPrice'
  },
  {
    title: 'Status',
    dataIndex: 'staus'
  }
]

const Dashboard = () => {
  const dispatch = useDispatch()

  const [dataMonthly, setDataMonthly] = useState([])
  const [dataMonthlySales, setDataMonthlySales] = useState([])

  const yearlyDataDataState = useSelector(state => state?.auth?.YearlyData)
  const monthlyDataState = useSelector(state => state?.auth?.MonthlyData)
  const orderState = useSelector(state => state?.auth?.orders?.orders)

  const dataTable = []
  for (let i = 0; i < orderState?.length; i++) {
    dataTable?.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname + orderState[i]?.user?.lastname,
      productC: orderState[i]?.orderItems?.length,
      price: orderState[i]?.totalPrice,
      dPrice: orderState[i]?.totalPriceAfterDiscount,
      staus: orderState[i]?.orderStatus
    })
  }

  useEffect(() => {
    dispatch(getYearOrder())
    dispatch(getMonthOrder())
    dispatch(getorders())
  }, [])

  useEffect(() => {
    let monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    let data = []
    let monthlyOrderCount = []

    for (let i = 0; i < monthlyDataState?.length; i++) {
      const element = monthlyDataState[i]
      data?.push({
        type: monthNames[element?._id?.month],
        Income: element?.amount
      })

      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count
      })
    }
    setDataMonthly(data)
    setDataMonthlySales(monthlyOrderCount)
  }, [monthlyDataState])

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'Income',
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 1
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: {
        alias: 'Months'
      },
      sales: {
        alias: 'Sales'
      }
    }
  }

  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'Sales',
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 1
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: {
        alias: 'Months'
      },
      sales: {
        alias: 'Sales'
      }
    }
  }

  return (
    <>
      <h3 className='mb-4 title'>Dashboard</h3>

      {yearlyDataDataState?.map((item, index) => {
        return (
          <div key={index} className='between-center gap-3'>
            <div className='d-flex justify-content-between br-10 align-items-end flex-grow-1 bg-white p-3 roudned-3'>
              <div>
                <p className='desc'>Total Income</p>
                <h4 className='mb-0 sub-title'>${item?.amount}</h4>
              </div>
              <div className='d-flex flex-column align-items-end'>
                <p className='mb-0 desc'>Income In Last Year From Today</p>
              </div>
            </div>
            <div className='d-flex justify-content-between br-10 align-items-end flex-grow-1 bg-white p-3 roudned-3'>
              <div>
                <p className='desc'>Total Sales</p>
                <h4 className='mb-0 sub-title'>${item?.count}</h4>
              </div>
              <div className='d-flex flex-column align-items-end'>
                <p className='mb-0  desc'>Sales In Last Year From Today</p>
              </div>
            </div>
          </div>
        )
      })}

      <div className='between-center gap-3'>
        <div className=' mt-4 flex-grow-1 w-50'>
          <h3 className='mb-4'>Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>

        <div className=' mt-4 flex-grow-1 w-50'>
          <h3 className='mb-4'>Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>

      <div className=' mt-4'>
        <h3 className='mb-4'>Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} size='middel' />
        </div>
      </div>
    </>
  )
}

export default Dashboard
