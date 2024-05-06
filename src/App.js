import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './css/normalize.css'
import './css/all.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js.map'
import './css/App.css'
import 'react-toastify/dist/ReactToastify.css'

import { PrivateRoutes } from './routing/PrivateRoutes'
import { OpenRoutes } from './routing/OpenRoutes'
import Login from './pages/Login'
import Dashboard from './components/Dashboard'
import MainLayout from './components/MainLayout'
import Enquiries from './pages/Enquiries'
import BlogList from './pages/BlogList'
import BlogCatList from './pages/BlogCatList'
import Customers from './pages/Customers'
import Orders from './pages/Orders'
import PCategoryList from './pages/CategoryList'
import BrandList from './pages/BrandsList'
import ColorsList from './pages/ColorsList'
import ProductsList from './pages/ProductsList'
import AddBlog from './pages/AddBlog'
import AddBlogCat from './pages/AddBlogCat'
import AddColor from './pages/AddColor'
import AddBrand from './pages/AddBrand'
import AddCatagory from './pages/AddCatagory'
import AddProduct from './pages/AddProduct'
import CouponList from './pages/CouponList'
import AddCoupon from './pages/AddCoupon'
import ViewEnq from './pages/ViewEnq'
import ViewOrder from './pages/ViewOrder'
import SecoundLoayout from './components/SecoundLoayout'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <OpenRoutes>
                <SecoundLoayout />
              </OpenRoutes>
            }
          >
            <Route index element={<Login />} />
          </Route>

          <Route
            path='/admin'
            element={
              <PrivateRoutes>
                <MainLayout />
              </PrivateRoutes>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path='customers' element={<Customers />} />
            <Route path='orders' element={<Orders />} />
            <Route path='order/:id' element={<ViewOrder />} />
            <Route path='coupon-list' element={<CouponList />} />
            <Route path='coupon' element={<AddCoupon />} />
            <Route path='coupon/:id' element={<AddCoupon />} />
            <Route path='products-list' element={<ProductsList />} />
            <Route path='product' element={<AddProduct />} />
            <Route path='product/:id' element={<AddProduct />} />
            <Route path='brand' element={<AddBrand />} />
            <Route path='brand/:id' element={<AddBrand />} />
            <Route path='category' element={<AddCatagory />} />
            <Route path='category/:id' element={<AddCatagory />} />
            <Route path='brand-list' element={<BrandList />} />
            <Route path='category-list' element={<PCategoryList />} />
            <Route path='color-list' element={<ColorsList />} />
            <Route path='color' element={<AddColor />} />
            <Route path='color/:id' element={<AddColor />} />
            <Route path='enquiries' element={<Enquiries />} />
            <Route path='enquiries/:id' element={<ViewEnq />} />
            <Route path='blog-list' element={<BlogList />} />
            <Route path='blog' element={<AddBlog />} />
            <Route path='blog/:id' element={<AddBlog />} />
            <Route path='blog-category' element={<AddBlogCat />} />
            <Route path='blog-category/:id' element={<AddBlogCat />} />
            <Route path='blog-category-list' element={<BlogCatList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
