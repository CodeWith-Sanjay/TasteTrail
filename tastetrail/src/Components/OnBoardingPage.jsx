import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import '../styles/onBoardingPage.css';
import Loader from './Loader/Loader.jsx';
import { setUserPreferences,  checkOnboardingStatus} from '../services/userServices.js';

const allergies = ['none', "nuts", "dairy", "soy", "gluten", "eggs", "seafood"];
const cuisinePreferences = ["Indian", "Italian", "Chinese", "Mexican", "Thai", "American", "Mediterranean"];


const OnBoardingPage = () => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({});
    const [preferences, setPreferences] = useState({
        diet: '',
        allergies: [],
        cuisines: []
    });

    useEffect(() => {
        const checkStatus = async () => {
            const res = await checkOnboardingStatus();

            if(res?.isOnboard) {
                navigate('/dashboard', {replace: true});
            }
        }

        checkStatus();
    }, []);
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        setPreferences(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCheckboxChange = (e, type) => {
        const {value, checked} = e.target

        setPreferences((prev) => ({
            ...prev,
            [type]: checked 
                ? [...prev[type], value]
                : prev[type].filter((item) => item !== value)
        }))
    }

    const handleOnboardingSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = {}

        if(!preferences.diet) {
            validateErrors.diet = 'Diet value is required'
        }

        if(preferences.cuisines.length === 0) {
            validateErrors.cuisines = 'Select atleast one cuisines'
        }

        setErrors(validateErrors)
        if (Object.keys(validateErrors).length > 0) return;
        
        try {
            setLoader(true);

            const payload = {
                diet: preferences.diet,
                allergies: preferences.allergies,
                cuisines: preferences.cuisines
            }

            const res = await setUserPreferences(payload);

            if(res.success) {
                console.log('Preferences set successfully');
                
                // const user = JSON.parse(localStorage.getItem('user')) || {};
                localStorage.setItem('user', JSON.stringify(res.data))

                if(res?.data?.isOnboard) {
                    navigate('/dashboard', {replace: true})
                } else {
                    navigate('/onBoard', {replace: true});
                }
            } else if(res.message && res.message.toLowerCase().trim().includes('user')) {
                setErrors({api: 'User not found'});
            } else {
            setErrors({api: res.message || 'Something went wrong'})
                console.log('Error setting preferences: ', res.message);
            }
        } catch (error) {
            console.log('Error setting preferences: ', error);
        } finally {
            setLoader(false)
        }
    }
  return (
    <div className='onboarding-container'>
        <h1 className='onboarding-heading'>Choose Preferences</h1>

        <form onSubmit={handleOnboardingSubmit} className='onboarding-form'>
            <div className='onboarding-input-container'>
                <p className='onboarding-p'>Diet type</p>
                <select name='diet' value={preferences.diet} onChange={handleChange} className='onboarding-input'>
                    <option value=''>Select diet</option>
                    <option value='none'>None</option>
                    <option value='vegan'>Vegan</option>
                    <option value='vegetarian'>Vegetarian</option>
                    <option value='keto'>Keto</option>
                    <option value='low-carb'>Low-carb</option>
                    <option value='gluten-free'>gluten-free</option>
                    <option value='non-vegetarian'>Non-vegetarian</option>
                </select>
            </div>

            <div className="onboarding-input-container">
                <p className='onboarding-p'>Allergies</p>
                {allergies.map((item) => (
                    <label key={item} className='onboarding-label'>
                        <input type='checkbox' className='onboarding-input' value={item} onChange={(e) => handleCheckboxChange(e, 'allergies')}/>
                        {item}
                    </label>
                ))}
            </div>

            <div className="onboarding-input-container">
                <p className='onboarding-p' label='onboarding-label'>Cuisines</p>
                {cuisinePreferences.map((cuisine) => (
                    <label key={cuisine} className='onboarding-label'>
                        <input type='checkbox' className='onboarding-input' value={cuisine} onChange={(e) => handleCheckboxChange(e, 'cuisines')}/>
                        {cuisine}
                    </label>
                ))}
            </div>

            <button type='submit' className='onboarding-button' disabled={loader}>
            {loader ? <Loader /> : 'Submit'}</button>

            {
                errors.api ? <p className='onboarding-error'>{errors.api}</p> :
                errors.diet ? <p className='onboarding-error'>{errors.diet}</p> :
                errors.allergies ? <p className='onboarding-error'>{errors.allergies}</p> :
                errors.cuisines ? <p className='onboarding-error'>{errors.cuisines}</p> : null
            }
        </form>
    </div>
  )
}

export default OnBoardingPage
