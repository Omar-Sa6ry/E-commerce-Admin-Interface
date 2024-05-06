import { Navigate } from 'react-router-dom'

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem('user')
  )?.token
  return getTokenFromLocalStorage ? (
    children
  ) : (
    <Navigate to='/' replace={true} />
  )
}