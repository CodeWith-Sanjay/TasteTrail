import React from 'react'

import '../styles/landingPage.css';
import Navbar from './Navbar.jsx'
import HeroSection from './HeroSection.jsx';

const LandingPage = () => {
  return (
    <div className='landingPage-container'>
      <Navbar />
      <HeroSection />
    </div>
  )
}

export default LandingPage
