import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import XIcon from '@mui/icons-material/X';
import '../styles/footer.css';

import { sendContactMessage } from '../services/contactService.js';
import Loader from './Loader/Loader.jsx';

const Footer = () => {

    const [errorMessage, seterrorMessage] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const [contactMessage, setContactMessage] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleContactChange = (e) => {
        const {name, value} = e.target;

        setContactMessage(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = {};
        const emailRegexCode = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!contactMessage.name) {
            validateErrors.name = 'Name is required'
        }

        if(!contactMessage.email) {
            validateErrors.email = 'Email is required'
        } else if(!emailRegexCode.test(contactMessage.email)) {
            validateErrors.email = 'Invalid email id'
        }

        if(!contactMessage.message) {
            validateErrors.message = 'Message is required'
        }

        seterrorMessage(validateErrors);
        if(Object.keys(validateErrors).length > 0) return;

        setLoader(true);

        try {
            const res = await sendContactMessage(contactMessage);
            if(res.success) {
                console.log('Contact message sent successfully');
                setSuccessMessage('Message sent successfully');
                setLoader(false);
                setContactMessage({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                seterrorMessage({form: res.message || 'Error sending message'});
                setLoader(false);
            }
        } catch (error) {
            console.log('Error sending contact message: ', error);
        }
    }

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
            <input type='name' name='name' onChange={handleContactChange} value={contactMessage.name} placeholder='Enter your name' className='footer-contact-input' />
            <input type='email' name='email' onChange={handleContactChange} value={contactMessage.email} placeholder='Enter your email' className='footer-contact-input' />
            <textarea placeholder='Write a message...' onChange={handleContactChange} name='message' value={contactMessage.message} className='footer-contact-textarea' />
            
            <button type='submit' className='footer-contact-button' onClick={handleContactSubmit} disabled={loader}>
                {loader ? <Loader /> : 'Send'}
            </button>
            {
                errorMessage.name ? (<p className='error-message'>{errorMessage.name}</p>) :
                errorMessage.email ? (<p className='error-message'>{errorMessage.email}</p>) :
                errorMessage.message ? <p className='error-message'>{errorMessage.message}</p> : 
                errorMessage.form ? <p className='error-message'>{errorMessage.form}</p> :
                successMessage ? <p className='success-message'>{successMessage}</p> : null
            }

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
