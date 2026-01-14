import React from 'react'

import '../styles/features.css';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

import featureImage from '../assets/FeaturesImage.jpg';

const Features = () => {
  return (
    <div className='features-container'>
        <Navbar />

        <div className='features-content'>   
        <h1>Features</h1>

        <p>
            TasteTrail is an all-in-one recipe discovery and meal planning platform designed to simplify everyday cooking. 
            Users can create a personalized profile by setting dietary preferences, allergies, and favorite cuisines, 
            allowing the app to deliver tailored recipe recommendations. A powerful discovery engine enables users to 
            search and filter recipes by ingredients, preparation time, diet type, and cuisine, while detailed recipe 
            pages provide step-by-step instructions, ingredient breakdowns, and community ratings. With the interactive 
            weekly meal planner, users can drag and drop recipes into a calendar to organize breakfasts, lunches, and 
            dinners in advance. Based on the planned meals, TasteTrail automatically generates a categorized shopping 
            list that aggregates ingredients and quantities, helping users shop efficiently. Users can save recipes into 
            custom collections for quick access, share reviews and photos of their creations, and explore feedback from 
            the community. An admin dashboard supports recipe management, ensuring high-quality, well-organized content 
            across the platform. Together, these features create a seamless experience that guides users from recipe 
            discovery to meal planning and grocery shopping with ease.
        </p>

        <img src={featureImage} alt='feature-image'/>

        </div> 
        <Footer />
    </div>
  )
}

export default Features
