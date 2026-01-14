import React from 'react'

import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

import '../styles/howItsWorks.css';

const HowItsWorks = () => {
  return (
    <div className='howItsWorks-container'>
        <Navbar />

        <div className='howItsWorks-main-content'>
            <h1>How It Works?</h1>

            <p>
                TasteTrail guides users through a simple, structured cooking journey. After signing up, users create
                a personalized profile by selecting their dietary preferences, allergies, and favorite cuisines, 
                which helps the platform tailor recipe recommendations. Users can then explore a wide range of 
                recipes using advanced search and filters, view detailed cooking instructions, and save favorites 
                into custom collections. Recipes can be added directly to the interactive weekly meal planner using 
                a drag-and-drop calendar, allowing users to plan meals for each day with ease. Once the meal plan is 
                finalized, TasteTrail automatically generates a categorized shopping list by combining ingredients 
                from all selected meals, adjusting quantities as needed. Users can review recipes, share photos of 
                their dishes, and refine future recommendations based on their activity, making the experience smarter 
                and more personalized over time.
            </p>
        </div>

    <Footer />
    </div>
  )
}

export default HowItsWorks