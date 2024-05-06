import { Navigate } from 'react-router-dom'

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(
    localStorage?.getItem('user')
  )?.token
  return getTokenFromLocalStorage ? (
    <Navigate to='/admin' replace={true} />
  ) : (
    children
  )
}