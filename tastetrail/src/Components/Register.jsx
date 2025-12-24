import React, {useState} from 'react'
import {Link} from 'react-router-dom';

import registerImage from '../assets/RegisterImage.jpg';
import Loader from './Loader/Loader.jsx';
import '../styles/register.css';

const Register = () => {

  const [loader, setLoader] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleRegisterChange = (e) => {
    const {name, value} = e.target;

    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    setLoader(true);
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

          <button type='submit' className='register-button' onClick={handleRegisterSubmit} disabled={loader}>
            {
              loader ? <Loader /> : 'Register'
            }
          </button>
        </form>

        <p>Already have an account? <Link to='/login' className='register-login-link'>Login</Link> </p>
      </div>

      <div className='register-photo-container'>
        <img src={registerImage} alt='Register image' className='register-photo' />
      </div>
    </div>
  )
}

export default Register