import React from 'react'

import HeroImage from '../assets/HeroImage.jpg';
import HeroRecipe from '../assets/HeroRecipe.jpg';
import HeroMeal from '../assets/HeroMeal.jpg';
import HeroShop from '../assets/HeroShop.jpg';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <div className='hero-container'>
      <div className='hero-image-container'>
        <img src={HeroImage} alt='Hero' className='hero-image'/>

        <div className='hero-header-container'>
            <p className='hero-title'>Turn everyday cooking into an adventure.</p>
            <p className='hero-subtitle'>Discover. Plan. Cook.</p>
        </div>
      </div>

      <div className='features-container'>
        <div className="recipe-container">
            <img src={HeroRecipe} alt='Recipe'/>

            <div>
            <p className='feature-header'>Recipe Feature</p>
            <p className='feature-p'>Discover recipes tailored to your dietary needs, taste preferences, 
                and lifestyle. Whether you’re vegan, vegetarian, or just exploring 
                new flavors, finding the perfect dish has never been easier.
            </p>
            </div>
        </div>

        <div className="meal-container">
            <img src={HeroMeal} alt="Meal" />

            <div>
            <p className='feature-header'>Meal Feature</p>
            <p className='feature-p'>Plan your meals for the entire week in just a few minutes. Organize
                 breakfast, lunch, and dinner effortlessly and stay consistent with
                 your food goals, even on busy days.
            </p>
            </div>
        </div>

        <div className="shopping-container">
            <img src={HeroShop} alt='Shop'/>

            <div>
            <p className='feature-header'>Shopping Feature</p>
            <p className='feature-p'>Automatically generate a smart shopping list based on your planned 
                meals. Ingredients are neatly grouped and ready, helping you shop 
                faster and never miss an item.
            </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
