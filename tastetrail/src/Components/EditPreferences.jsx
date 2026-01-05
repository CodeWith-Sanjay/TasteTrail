import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import { editUserPreferences } from '../services/userServices.js';
import Loader from '../Components/Loader/Loader.jsx';
import '../styles/editPreferences.css';

const allergies = ['none', "nuts", "dairy", "soy", "gluten", "eggs", "seafood"];
const cuisinePreferences = ["Indian", "Italian", "Chinese", "Mexican", "Thai", "American", "Mediterranean"];


const EditPreferences = () => {

  const navigate = useNavigate();
  
      const [loader, setLoader] = useState(false);
      const [errors, setErrors] = useState({});
      const [preferences, setPreferences] = useState({
          diet: '',
          allergies: [],
          cuisines: []
      });
      
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

      const handleEditPreferences = async (e) => {
        e.preventDefault();

        const validateErrors = {}

        if(!preferences.diet) {
          validateErrors.diet = 'Diet value is required'
        }

        if(preferences.cuisines.length === 0) {
            validateErrors.cuisines = 'Select at least one cuisine'
        }

        setErrors(validateErrors);
        if(Object.keys(validateErrors).length > 0) return

        try {
            setLoader(true);

            const res = await editUserPreferences(preferences);

            if(res.success) {
                const user = JSON.parse(localStorage.getItem('user')) || {};
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        ...user,
                        preferences: res.data.preferences,
                        isOnboard: res.data.isOnboard
                    })
                )

                navigate('/dashboard', {replace: true})
            } else {
                setErrors({api: res.message});
            }
            
        } catch (error) {
            setErrors({api: error.message});
        } finally {
            setLoader(false)
        }
      } 
  

  return (
    <div className='edit-preferences-container'>
        <h1 className='edit-preferences-heading'>Edit Preferences</h1>

        <form onSubmit={handleEditPreferences} className='edit-preferences-form'>
            <div className='edit-preferences-input-container'>
                <p className='edit-preferences-p'>Diet type</p>
                <select name='diet' value={preferences.diet} onChange={handleChange} className='edit-preferences-input'>
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

            <div className="edit-preferences-input-container">
                <p className='edit-preferences-p'>Allergies</p>
                {allergies.map((item) => (
                    <label key={item} className='edit-preferences-label'>
                        <input 
                            type='checkbox' 
                            className='edit-preferences-input'
                            checked={preferences.allergies.includes(item)} 
                            value={item} onChange={(e) => handleCheckboxChange(e, 'allergies')}/>
                        {item}
                    </label>
                ))}
            </div>

            <div className="edit-preferences-input-container">
                <p className='edit-preferences-p' label='edit-preferences-label'>Cuisines</p>
                {cuisinePreferences.map((cuisine) => (
                    <label key={cuisine} className='edit-preferences-label'>
                        <input 
                            type='checkbox' 
                            className='edit-preferences-input' 
                            checked={preferences.cuisines.includes(cuisine)} 
                            value={cuisine} onChange={(e) => handleCheckboxChange(e, 'cuisines')}/>
                        {cuisine}
                    </label>
                ))}
            </div>

            <button type='submit' className='edit-preferences-button' disabled={loader}>
            {loader ? <Loader /> : 'Submit'}</button>

            {
                errors.api ? <p className='edit-preferences-error'>{errors.api}</p> :
                errors.diet ? <p className='edit-preferences-error'>{errors.diet}</p> :
                errors.cuisines ? <p className='edit-preferences-error'>{errors.cuisines}</p> : null
            }
        </form>
    </div>
  )
}

export default EditPreferences
