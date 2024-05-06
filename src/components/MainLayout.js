import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { RiCustomerService2Line, RiCouponLine } from 'react-icons/ri'
import { TfiDashboard } from 'react-icons/tfi'
import { IoIosLogOut } from 'react-icons/io'
import { FaRegRectangleList } from 'react-icons/fa6'
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineBgColors
} from 'react-icons/ai'
import { SiBrandfolder } from 'react-icons/si'
import { CiViewList } from 'react-icons/ci'
import { GrCatalog } from 'react-icons/gr'
import { BiCategory, BiSolidColor } from 'react-icons/bi'
import { LiaBlogSolid } from 'react-icons/lia'
import { ImBlog } from 'react-icons/im'
import { FaClipboardList, FaBloggerB } from 'react-icons/fa'
import {
  MdAddShoppingCart,
  MdOutlineCategory,
  MdOutlineBrandingWatermark
} from 'react-icons/md'
import { Layout, Menu, Button, theme } from 'antd'
import { ToastContainer } from 'react-toastify'
import '../css/Layout.css'
import { TIMETOAST } from '../utils/SetTimeOutOfToast'

const { Header, Sider, Content } = Layout

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const navigate = useNavigate()

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <h2 className='fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>OAS</span>
            <span className='lg-logo'>OAS</span>
          </h2>
        </div>

        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'logout') {
              localStorage.clear()
              window.location.reload()
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <TfiDashboard className='fs-4' />,
              label: 'Dashboard'
            },
            {
              key: 'customers',
              icon: <RiCustomerService2Line className='fs-4' />,
              label: 'Customers'
            },
            {
              key: 'catalog',
              icon: <GrCatalog className='fs-4' />,
              label: 'catalog',
              children: [
                {
                  key: 'product',
                  icon: <MdAddShoppingCart className='fs-4' />,
                  label: 'Add Product'
                },
                {
                  key: 'products-list',
                  icon: <FaRegRectangleList className='fs-4' />,
                  label: 'Products List'
                },
                {
                  key: 'Brand',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Add Brand'
                },
                {
                  key: 'brand-list',
                  icon: <MdOutlineBrandingWatermark className='fs-4' />,
                  label: 'Brand List'
                },
                {
                  key: 'category',
                  icon: <MdOutlineCategory className='fs-4' />,
                  label: 'Add Category'
                },
                {
                  key: 'category-list',
                  icon: <BiCategory className='fs-4' />,
                  label: 'Category List'
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Add Color'
                },
                {
                  key: 'color-list',
                  icon: <BiSolidColor className='fs-4' />,
                  label: 'Color List'
                }
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders'
            },
            {
              key: 'marketing',
              icon: <RiCouponLine className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Coupon'
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Coupon List'
                }
              ]
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <LiaBlogSolid className='fs-4' />,
                  label: 'Add Blog'
                },
                {
                  key: 'blog-list',
                  icon: <CiViewList className='fs-4' />,
                  label: 'Blog List'
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog Category'
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog Category List'
                }
              ]
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Enquiries'
            },
            {
              key: 'logout',
              icon: <IoIosLogOut className='fs-4' />,
              label: 'Logout'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='between-center ps-3 pe-5'
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type='text'
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />

          <div className='d-flex gap-4 align-items-center'>
            {/* <div className='position-relative'>
              <IoIosNotifications className='fs-4' />
              <span className='flex-center badge bg-warning rounded-circle p-1 position-absolute'>
                3
              </span>
            </div> */}

            <div className='d-flex gap-3 align-items-center dropdown'>
              <div>
                <img
                  width={32}
                  height={32}
                  src='https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg'
                  alt=''
                />
              </div>
              <div
                role='button'
                id='dropdownMenuLink'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <h5 className='mb-0'>Omar</h5>
                <p className='mb-0'>omarahmedsabry05@gmail.com</p>
              </div>
              <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                <li>
                  <Link
                    className='dropdown-item py-1 mb-1'
                    style={{ height: 'auto', lineHeight: '20px' }}
                    to='/'
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className='dropdown-item py-1 mb-1'
                    style={{ height: 'auto', lineHeight: '20px' }}
                    to='/'
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
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
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
