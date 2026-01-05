import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthOnlyRoute = ({children}) => {

    const user = JSON.parse(localStorage.getItem('user'))

  return user ? children : <Navigate to='/login' replace/>
}

export default AuthOnlyRoute
