import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';

import { loginUser } from '../services/authServices.js';
import Loader from './Loader/Loader.jsx';
import '../styles/login.css';

import loginImage from '../assets/LoginImage.jpg';

const Login = () => {

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    const {name, value} = e.target;

    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = {};
    const emailRegexCode = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!loginData.email) {
      validateErrors.email = 'Email is required'
    } else if(!emailRegexCode.test(loginData.email)) {
      validateErrors.email = 'Invalid email format';
    }

    if(!loginData.password) {
      validateErrors.password = 'Password is required';
    }

    setErrors(validateErrors);
    if(Object.keys(validateErrors).length > 0) return;

    try {
      setLoader(true);

      const res = await loginUser(loginData);

      if(res.success) {
        setLoader(false);
        navigate('/dashboard', {replace: true});
        console.log('Login Success: ', res.message);

        setLoginData({
          email: '',
          password: ''
        });

        setErrors({});

      } else if(res.message && res.message.toLowerCase().trim().includes('user')) {
        setErrors({email: res.message || 'User not found'});
      } else if(res.message && res.message.toLowerCase().trim().includes('password')) {
        setErrors({password: res.message || 'Invalid password'});
      } else {
        alert(res.message || 'Login failed. Please try again later.');
      }
    } catch (error) {
      console.error('Login Error: ', error.message);
    } finally {
      setLoader(false)
    }
  }

  return (
    <div className='login-container'>

      <div className='login-form-container'>
        <h2 className='login-heading'>Welcome Back</h2>
        <form className='login-form'>

          <div className='login-input-container'>
            <input type='text' onChange={handleLoginChange} value={loginData.email} name='email' className='login-input' placeholder=''/>
            <label htmlFor='email' className='login-label'>Email</label>
          </div>

          <div className='login-input-container'>
            <input type='password' onChange={handleLoginChange} value={loginData.password} name='password' className='login-input' placeholder=''/>
            <label htmlFor='password' className='login-label'>Password</label>
          </div>

          <button type='submit' className='login-button' onClick={handleLoginSubmit} disabled={loader}>
            {
              loader ? <Loader /> : 'Login'
            }
          </button>
        </form>

        <p>Didn't have an account? <Link to='/register' className='login-login-link'>Register</Link> </p>

        {
          errors.form ? <p className='login-error-message'>{errors.form}</p> :
          errors.email ? <p className='login-error-message'>{errors.email}</p> :
          errors.password ? <p className='login-error-message'>{errors.password}</p> : null
        }

      </div>

      <div className='login-photo-container'>
        <img src={loginImage} alt='login image' className='login-photo' />
      </div>
    </div>
  )
}

export default Login
