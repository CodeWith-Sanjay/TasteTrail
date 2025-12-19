import React, { useEffect, useState } from 'react'

import HeroImage from '../assets/HeroImage.jpg';
import HeroRecipe from '../assets/HeroRecipe.jpg';
import HeroMeal from '../assets/HeroMeal.jpg';
import HeroShop from '../assets/HeroShop.jpg';
import HowItsWorksSignUp from '../assets/Howitsworks-Signup.jpg';
import HowItsWorksDiscoverRecipes from '../assets/Howitsworks-DiscoverRecipes.jpg';
import HowItsWorkPlanMeals from '../assets/Howitsworks-PlanMeals.jpg';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import '../styles/HeroSection.css';

const HowItsWorksContent = [
  {
    title: 'Sign Up & Set',
    subtitle: 'Create your profile and choose your dietary preferences, goals.',
    image:  HowItsWorksSignUp
  },
  {
    title: 'Discover recipes',
    subtitle: 'Explore recipes curated just for you based on your preferences.',
    image: HowItsWorksDiscoverRecipes
  },
  {
    title: 'Plan your meals',
    subtitle: 'Add recipes to your meal plan in a few simple clicks.',
    image: HowItsWorkPlanMeals
  }
]

const HeroSection = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState('next');
  const [imageIsHovered, setImageIsHovered] = useState(false);

  useEffect(() => {
    if(imageIsHovered) return;

    const timer = setTimeout(() => {
      setDirection('next')
      setCurrentStep(prev => 
        prev === HowItsWorksContent.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentStep, imageIsHovered]);

  const handlePrevious = () => {
    setDirection('previous');
    if(currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }

  const handleNext = () => {
    setDirection('next');
    if(currentStep < HowItsWorksContent.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }

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

            <div className='feature-texts'>
            <p className='feature-header'>Recipe Feature</p>
            <p className='feature-p'>Discover recipes tailored to your dietary needs, taste preferences, 
                and lifestyle. Whether you’re vegan, vegetarian, or just exploring 
                new flavors, finding the perfect dish has never been easier.
            </p>
            </div>
        </div>

        <div className="meal-container">
            <img src={HeroMeal} alt="Meal" />

            <div className='feature-texts'>
            <p className='feature-header'>Meal Feature</p>
            <p className='feature-p'>Plan your meals for the entire week in just a few minutes. Organize
                 breakfast, lunch, and dinner effortlessly and stay consistent with
                 your food goals, even on busy days.
            </p>
            </div>
        </div>

        <div className="shopping-container">
            <img src={HeroShop} alt='Shop'/>

            <div className='feature-texts'>
            <p className='feature-header'>Shopping Feature</p>
            <p className='feature-p'>Automatically generate a smart shopping list based on your planned 
                meals. Ingredients are neatly grouped and ready, helping you shop 
                faster and never miss an item.
            </p>
            </div>
        </div>
      </div>

      <div className='howItsWorks-container' onMouseEnter={() => setImageIsHovered(true)} onMouseLeave={() => setImageIsHovered(false)}>
        {
        <div className={`howItsWorks-carousel ${direction}`}>
          <img key={currentStep} src={HowItsWorksContent[currentStep].image} alt={HowItsWorksContent[currentStep].title}/>

          <div className='howItsWorks-content'>
            <button className='howItsWorks-btn' onClick={handlePrevious}>
              <span>
                <ArrowBackIosNewRoundedIcon />
              </span>
            </button>

            <div className='howItsWorks-texts' key={currentStep}>
            <p className='howItsWorks-title'>{HowItsWorksContent[currentStep].title}</p>
            <p className='howItsWorks-subtitle'>{HowItsWorksContent[currentStep].subtitle}</p>
            </div>

            <button className={'howItsWorks-btn'} onClick={handleNext}>
              <span>
                <ArrowForwardIosRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      }
      </div>
    </div>
  )
}

export default HeroSection
