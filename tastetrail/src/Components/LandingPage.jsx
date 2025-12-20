import React from 'react'

import '../styles/landingPage.css';
import Navbar from './Navbar.jsx'
import HeroSection from './HeroSection.jsx';
import Footer from './Footer.jsx';

const LandingPage = () => {
  return (
    <div className='landingPage-container'>
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  )
}

export default LandingPage
