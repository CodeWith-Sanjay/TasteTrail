import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom';

import '../styles/navbar.css';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const Navbar = () => {

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='navbar-container'>

      <div className='top-nav'>
        <p>Contact us - <a href='mailto:sanjayganesan016@gmail.com'>sanjayganesan016@gmail.com</a> </p>
      </div>

      <div className='nav-wrapper'>
      <div className='top-nav-header'>

        <div>
          <h1>TasteTrail</h1>
          <p>COOK WITH CONFIDENCE</p>
        </div>

        <div className='nav-search-container'>
          <input className='nav-search' type='text' placeholder='Search'/>
          <SearchRoundedIcon className='nav-search-icon'/>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`menu-icon ${menuOpen ? 'hide': ''}`} >
            <MenuRoundedIcon />
          </span>

          <span className={`close-icon ${menuOpen ? 'show': ''}`}>
            <CloseRoundedIcon  />
          </span>
        </div>

      </div>

      <nav className={`navbar-options ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to='/' className={location.pathname === '/' || location.pathname === '/home' ? 'active-option' : 'option-link'} style={{textDecoration: 'none'}}>HOME</Link></li>
          <li><Link to='/' className={location.pathname === '/features' ? 'active-option' : 'option-link'} style={{textDecoration: 'none'}}>FEATURES</Link></li>
          <li><Link to='/' className={location.pathname === '/howitworks' ? 'active-option' : 'option-link'} style={{textDecoration: 'none'}}>HOW IT WORKS</Link></li>
          <li><Link to='/' className={location.pathname === '/contact' ? 'active-option' : 'option-link'} style={{textDecoration: 'none'}}>CONTACT</Link></li>
          <Link className='navbar-link' to='/login'>LOGIN</Link>
          <Link className='navbar-link' to='/register'>SIGN UP</Link>
        </ul>
      </nav>
      
      </div>

    </div>
  )
}

export default Navbar
