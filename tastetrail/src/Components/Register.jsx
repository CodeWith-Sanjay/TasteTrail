import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';

import registerImage from '../assets/RegisterImage.jpg';
import Loader from './Loader/Loader.jsx';
import '../styles/register.css';
import { registerUser } from '../services/authServices.js';

const Register = () => {

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegisterChange = (e) => {
    const {name, value} = e.target;

    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = {};
    const emailRegexCode = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!registerData.name) {
      validateErrors.name = 'Name is required'
    }

    if(!registerData.email) {
      validateErrors.email = 'Email is required'
    } else if(!emailRegexCode.test(registerData.email)) {
      validateErrors.email = 'Invalid email id'
    }

    if(!registerData.password) {
      validateErrors.password = 'Password is required'
    }

    if(!registerData.confirmPassword) {
      validateErrors.confirmPassword = 'Password confirmation is required'
    } else if (registerData.password !== registerData.confirmPassword) {
      validateErrors.confirmPassword = 'Passwords does not match'
    }

    setErrors(validateErrors);
    if(Object.keys(validateErrors).length > 0) return; 


    try {
      setLoader(true);

      const payload = {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      }

      const res = await registerUser(payload);
      // setLoader(false);
      
      if(res.success) {
        setLoader(false);
        navigate('/onBoard');
        console.log('Registration successful');

        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        
        setErrors({});
      } else if (res.message && res.message.toLowerCase().trim().includes('exist')) {
        setErrors({email: 'User email already exists'});
      } else {
        alert(res.message || 'Something went wrong during registration');
      }

    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoader(false);
    }
  }
  
  return (
    <div className='register-container'>

      <div className='register-form-container'>
        <h2 className='register-heading'>Create an Account</h2>
        <form className='register-form'>
          <div className='register-input-container'>
            <input type='text' onChange={handleRegisterChange} value={registerData.name} name='name' className='register-input' placeholder=''/>
            <label htmlFor='name' className='register-label'>Full Name</label>
          </div>

          <div className='register-input-container'>
            <input type='text' onChange={handleRegisterChange} value={registerData.email} name='email' className='register-input' placeholder=''/>
            <label htmlFor='email' className='register-label'>Email</label>
          </div>

          <div className='register-input-container'>
            <input type='password' onChange={handleRegisterChange} value={registerData.password} name='password' className='register-input' placeholder=''/>
            <label htmlFor='password' className='register-label'>Password</label>
          </div>

          <div className='register-input-container'>
            <input type='password' onChange={handleRegisterChange} value={registerData.confirmPassword} name='confirmPassword' className='register-input' placeholder=''/>
            <label htmlFor='confirmPassword' className='register-label'>Confirm Password</label>
          </div>

          <button type='submit' className='register-button' onClick={handleRegisterSubmit} disabled={loader}>
            {
              loader ? <Loader /> : 'Register'
            }
          </button>
        </form>

        <p>Already have an account? <Link to='/login' className='register-login-link'>Login</Link> </p>
        {
          errors.form ? <p className='register-error-message'>{errors.form}</p> :
          errors.name ? <p className='register-error-message'>{errors.name}</p> :
          errors.email ? <p className='register-error-message'>{errors.email}</p> :
          errors.password ? <p className='register-error-message'>{errors.password}</p> :
          errors.confirmPassword ? <p className='register-error-message'>{errors.confirmPassword}</p> : null
        }
      </div>

      <div className='register-photo-container'>
        <img src={registerImage} alt='Register image' className='register-photo' />
      </div>
    </div>
  )
}

export default Register