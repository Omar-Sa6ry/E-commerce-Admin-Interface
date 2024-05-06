import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'
import 'react-toastify/dist/ReactToastify.css'

const SecoundLoayout = () => {
  return (
    <Layout>
      <ToastContainer
        position='top-right'
        autoClose={TIMETOAST}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Outlet />
    </Layout>
  )
}

export default SecoundLoayout
