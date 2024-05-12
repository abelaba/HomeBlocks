import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  let location = useLocation()

  const isAuthenticated = sessionStorage.getItem('token') !== null

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
