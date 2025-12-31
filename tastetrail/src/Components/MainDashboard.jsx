import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import MainNavbar from './MainDashboard/MainNavbar.jsx'
import { getDashboard } from '../services/dashboardService.js';

const MainDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();
        console.log(res.message);
      } catch (error) {
        if(error.response?.status === 401) {
          console.log('Unauthorized, redirecting to login');
          localStorage.removeItem('user');
          navigate('/login');
        }
        console.log('Error fetching dashboard: ', error.message);
      }
    }

    fetchDashboard();
  }, []);
  return (
    <div>
      <MainNavbar />
    </div>
  )
}

export default MainDashboard
