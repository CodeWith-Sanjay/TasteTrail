import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import '../styles/onBoardingPage.css';
import Loader from './Loader/Loader.jsx';
import { setUserPreferences,  checkOnboardingStatus} from '../services/userServices.js';

const allergies = ["nuts", "dairy", "soy", "gluten", "eggs", "seafood"];
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

            if(res?.isOnboarded) {
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
                
                const user = JSON.parse(localStorage.getItem('user')) || {};
                localStorage.setItem('user', 
                    JSON.stringify({
                        ...user,
                        isOnboarded: true
                    })
                )
                navigate('/dashboard', {replace: true});
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
        <h1>Choose Preferences</h1>

        <form onSubmit={handleOnboardingSubmit}>
            <div className='onboarding-input-container'>
                <p>Diet type</p>
                <select name='diet' value={preferences.diet} onChange={handleChange}>
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
                <p>Allergies</p>
                {allergies.map((item) => (
                    <label key={item}>
                        <input type='checkbox' value={item} onChange={(e) => handleCheckboxChange(e, 'allergies')}/>
                        {item}
                    </label>
                ))}
            </div>

            <div className="onboarding-input-container">
                <p>Cuisines</p>
                {cuisinePreferences.map((cuisine) => (
                    <label key={cuisine}>
                        <input type='checkbox' value={cuisine} onChange={(e) => handleCheckboxChange(e, 'cuisines')}/>
                        {cuisine}
                    </label>
                ))}
            </div>

            <button type='submit' disabled={loader}>
            {loader ? <Loader /> : 'Submit'}</button>

            {
                errors.api ? <p>{errors.api}</p> :
                errors.diet ? <p>{errors.diet}</p> :
                errors.allergies ? <p>{errors.allergies}</p> :
                errors.cuisines ? <p>{errors.cuisines}</p> : null
            }
        </form>
    </div>
  )
}

export default OnBoardingPage
