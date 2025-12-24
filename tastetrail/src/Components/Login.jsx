import React, {useState} from 'react'
import {Link} from 'react-router-dom';

import Loader from './Loader/Loader.jsx';
import '../styles/login.css';

import loginImage from '../assets/LoginImage.jpg';

const Login = () => {

  const [loader, setLoader] = useState(false);
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setLoader(true);
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
      </div>

      <div className='login-photo-container'>
        <img src={loginImage} alt='login image' className='login-photo' />
      </div>
    </div>
  )
}

export default Login
