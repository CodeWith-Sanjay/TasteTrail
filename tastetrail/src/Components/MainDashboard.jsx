import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import MainNavbar from './MainDashboard/MainNavbar.jsx'
import { getDashboard } from '../services/dashboardService.js';
import MainHero from './MainDashboard/MainHero.jsx';

const MainDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();

        if(res.success) {
          localStorage.setItem('user', JSON.stringify(res.data));
        } else if (res.status === 401) {
          localStorage.clear();
          navigate('/login', {replace: true})
        }
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
      <MainHero />
    </div>
  )
}

export default MainDashboard
