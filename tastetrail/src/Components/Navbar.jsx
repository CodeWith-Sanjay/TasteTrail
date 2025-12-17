import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import '../styles/navbar.css';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='navbar-container'>

      <div className='top-nav'>
        <p>Contact us - <a href='mailto:sanjayganesan016@gmail.com'>sanjayganesan016@gmail.com</a> </p>
      </div>

      <div className='top-nav-header'>

        <div>
          <h1>TasteTrail</h1>
          <p>COOK WITH CONFIDENCE</p>
        </div>

        <div className='nav-search-container'>
          <input className='nav-search' type='text' placeholder='Search'/>
          <SearchRoundedIcon className='nav-search-icon'/>
        </div>

        <div className="hamburger">
          <MenuRoundedIcon onClick={() => setMenuOpen(!menuOpen)}/>
        </div>
      </div>

      <nav className='navbar-options'>
        <ul>
          <li>HOME</li>
          <li>FEATURES</li>
          <li>HOW IT WORKS</li>
          <li>CONTACT</li>
          <Link className='navbar-link' to='/login'>LOGIN</Link>
          <Link className='navbar-link' to='/register'>SIGN UP</Link>
        </ul>

        
      </nav>

    </div>
  )
}

export default Navbar
