import React from 'react'
import {Outlet} from 'react-router-dom';

import '../styles/dashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className='dashboard-layout'>
        <Outlet />      
    </div>
  )
}

export default DashboardLayout
