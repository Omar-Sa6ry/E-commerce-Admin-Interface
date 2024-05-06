import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import CustomModel from '../components/CustomModel'
import EditDelete from '../components/Edit&Delete'
import {
  getAproducts,
  deleteAproduct,
  resetState
} from '../features/products/productSlice'

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
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a?.brand?.length - b?.brand?.length
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a?.category?.length - b?.category?.length
  },
  // {
  //   title: 'Color',
  //   dataIndex: 'color'
  // },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Productlist = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [productId, setproductId] = useState('')
  const dataTable = []

  const showModal = e => {
    setOpen(true)
    setproductId(e)
  }
  const hideModal = () => {
    setOpen(false)
  }

  const productState = useSelector(state => state?.product?.products)
  const gproduct = useSelector(state => state?.product)
  const { isSuccess, isError } = gproduct

  for (let i = 0; i < productState?.length; i++) {
    dataTable.push({
      key: i + 1,
      title: productState[i]?.title,
      brand: productState[i]?.brand,
      category: productState[i]?.category,
      // color: productState[i].color,
      price: productState[i]?.price,
      action: (
        <EditDelete
          Edit={`/admin/product/${productState[i]?._id}`}
          onClick={() => showModal(productState[i]?._id)}
        />
      )
    })
  }

  useEffect(() => {
    dispatch(getAproducts())
    dispatch(resetState())
  }, [])

  const deleteproduct = e => {
    if (isSuccess) {
      toast.success(`Product Deleted Successfullly!`)
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
    dispatch(deleteAproduct(e))
    setOpen(false)
    setTimeout(() => {
      dispatch(getAproducts())
    }, TIMETOAST)
  }

  return (
    <>
      <div className=' mt-3'>
        <h3 className='mb-3'>Products List</h3>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
        ;
        <CustomModel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteproduct(productId)
          }}
          title='Are you sure you want to delete this Product ?'
        />
      </div>
    </>
  )
}

export default Productlist
