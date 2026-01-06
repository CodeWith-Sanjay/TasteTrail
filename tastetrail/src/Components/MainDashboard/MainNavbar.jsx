import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { logoutUser } from '../../services/authServices.js';
import './mainNavbar.css';
import Loader from '../Loader/Loader.jsx';

const MainNavbar = () => {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [loader, setLoader] = useState(false);
    const [isMouseHover, setIsMouseHover] = useState(false);

    const user = JSON.parse(localStorage.getItem('user')) || {};

    useEffect(() => {
        const handleScroll = () => {
          if(window.scrollY > 120) {
            setIsSticky(true);
          } else {
            setIsSticky(false)
          }
        }
    
        window.addEventListener('scroll', handleScroll);;
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = async () => {
        setLoader(true);

        try {
            const res = await logoutUser();

            if(res.success) {
                localStorage.clear();
                setLoader(false);
                navigate('/');
                console.log('User logged out successfully');
            } else {
                alert('Please try again later');
            }
        } catch (error) {
            console.log('Error logging out user: ', error.message);
        } finally {
            localStorage.removeItem('user');
            navigate('/login');
            setLoader(false)
        }
    }

    if(loader) {
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh'}}>
          <Loader />
        </div>
      )
    }

  return (
    <div className='main-navbar-container'>
      <div className='top-nav'>
        <p>Contact us - <a href='mailto:sanjayganesan016@gmail.com'>sanjayganesan016@gmail.com</a> </p>
      </div>

      <div className='main-nav-wrapper'>

      <div className='main-nav-header'>

        <div>
          <h1>TasteTrail</h1>
          <p>COOK WITH CONFIDENCE</p>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(prev => !prev)}>
          <span className={`menu-icon ${menuOpen ? 'hide': ''} `}>
            <MenuRoundedIcon />
          </span>

          <span className={`close-icon ${menuOpen ? 'show': ''}`}>
            <CloseRoundedIcon  />
          </span>
        </div>

      </div>

      <nav className={`main-navbar-options ${menuOpen ? 'open' : ''} ${isSticky ? 'sticky' : ''}`}>
        <h1 className='main-navbar-name'>Hello {user.name || 'User'}</h1>

        <div className='main-navbar-icons'>
          <div className="account-hover-wrapper" onMouseEnter={() => setIsMouseHover(true)} onMouseLeave={() => setIsMouseHover(false)}>
            <span className='account-icon'>
                <AccountCircleIcon />
            </span>

            {isMouseHover && (
              <div className='account-dropdown'>
                <p className='account-details'>Name: <span className='account-values'>{user.name}</span></p>
                <p className='account-details'>Email: <span className='account-values'>{user.email}</span></p>

                <p className='account-details'>Diet: 
                  <span className='account-values'>
                    {user.preferences?.diet}
                  </span>
                </p>

                <p className='account-details'>Allergies: 
                  <span className='account-values'>
                    {user.preferences?.allergies.join(', ')}
                  </span>
                </p>

                <p className='account-details'>cuisines: 
                  <span className='account-values'>
                    {user.preferences?.cuisines.join(', ')}
                  </span>
                </p>

                <button onClick={() => navigate('/edit-preferences')} className='edit-preference-btn'>
                  Edit Preferences
                </button>
              </div>
            )}
          </div>
            

            <span className='logout-icon' onClick={handleLogout}>
                <LogoutIcon />
            </span>
        </div>
      </nav>
      
      </div>
    </div>
  )
}

export default MainNavbar
