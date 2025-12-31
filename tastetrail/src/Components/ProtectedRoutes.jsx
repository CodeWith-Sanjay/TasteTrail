import React from 'react'

import Loader from './Loader/Loader.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {

  const storedUser = localStorage.getItem('user')

  if(!storedUser) {
    return <Navigate to='/login' replace/>
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error('Invalid user in localstorage: ', error);
    localStorage.removeItem('user');
    return <Navigate to='/onBoard' replace/>
  }

    if(!user) return <Navigate to='/login' replace/>

    if(!user.isOnboard) {
        return <Navigate to='/onBoard' replace />
    }

  return children
}

export default ProtectedRoutes
