import React from 'react'

const AuthOnlyRoute = ({children}) => {

    const user = JSON.parse(localStorage.getItem('user'))

  return user ? children : <Navigate to='/login' replace/>
}

export default AuthOnlyRoute
