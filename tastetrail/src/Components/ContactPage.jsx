import React from 'react'

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

import '../styles/contactPage.css';

const ContactPage = () => {
  return (
    <div className='contactPage-container'>
      <Navbar />

      <div className='contactPage-main-content'>
        <h1>Contact</h1>

        <p>
            We’d love to hear from you. Whether you have questions, feedback, feature suggestions, or need support, 
            the TasteTrail team is here to help. Reach out to us through the contact form by providing your name, 
            email address, and message, and we’ll get back to you as soon as possible. Your input helps us improve 
            TasteTrail and create a better experience for everyone who enjoys discovering, planning, and cooking 
            great food.
        </p>
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
