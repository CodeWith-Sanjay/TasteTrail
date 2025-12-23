import React from 'react'
import { Outlet } from 'react-router-dom';

import '../styles/registerLoginLayout.css';

const RegisterLoginLayout = () => {
  return (
    <div className='register-login-container'>
      <Outlet />
    </div>
  )
}

export default RegisterLoginLayout
