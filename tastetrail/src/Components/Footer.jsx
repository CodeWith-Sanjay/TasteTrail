import React from 'react'
import {Link} from 'react-router-dom'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import XIcon from '@mui/icons-material/X';
import '../styles/footer.css';

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className="footer-header">
            <h1>TasteTrail</h1>
            <p>COOK WITH CONFIDENCE</p>

            <div className='footer-quote-container'>
                <p className='footer-quote'>Crafted for cooking experts, curious beginners,</p>
                <p className='footer-quote'>and everyone who loves sharing flavors.</p>
            </div>
        </div>

        <form className='footer-contact-container'>
            <input type='name' placeholder='Enter your name' className='footer-contact-input' />
            <input type='email' placeholder='Enter your email' className='footer-contact-input' />
            <textarea placeholder='Write a message...' className='footer-contact-textarea' />
            <button type='submit' className='footer-contact-button'>Send</button>

            <div className="social-links-container">
                <a href='https://www.instagram.com' target='_blank'><span className='instagram'><InstagramIcon /></span></a>
                <a href='https://www.facebook.com' target='_blank'><span className='facebook'><FacebookIcon /></span></a>
                <a href='https://www.whatsapp.com' target='_blank'><span className='whatsapp'><WhatsAppIcon /></span></a>
                <a href='https://www.X.com' target='_blank'><span className='x'><XIcon /></span></a>
            </div>
        </form>
    </div>
  )
}

export default Footer
