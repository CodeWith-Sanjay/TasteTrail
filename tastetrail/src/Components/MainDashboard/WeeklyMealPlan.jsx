import React from 'react'

import './weeklyMealPlan.css';

const WeeklyMealPlan = () => {
  return (
    <div className='weekly-plan-container'>
        <h1 className='weekly-plan-header'>Week Meal Plan</h1>

        <div className='recipe-day-container'>
            <div className="weekly-plan-day-selector">
                <p>Sun</p>
                <p>Mon</p>
                <p>Tue</p>
                <p>Wed</p>
                <p>Thur</p>
                <p>Fri</p>
                <p>Sat</p>
            </div>

            <div className='recipe-plan-container'>
                <div className='breakfast-container'>    
                    <h1 className='recipe-header'>Breakfast Recipe</h1>
                    <p className='recipe-font'>Recipe Name</p>
                    <p className='recipe-font'>Recipe cuisine 💠 Time</p>
                    <details className='recipe-font'>
                        <summary>Ingredients</summary>
                        <ul>
                            <li>Rice - 1 cup</li>
                        </ul>
                    </details>
                    <button className='recipe-changer'>Change Recipe</button>
                </div>

                <div className='lunch-container'> 
                    <h1 className='recipe-header'>Lunch Recipe</h1>   
                    <p className='recipe-font'>Recipe Name</p>
                    <p className='recipe-font'>Recipe cuisine 💠 Time</p>
                    <details className='recipe-font'>
                        <summary>Ingredients</summary>
                        <ul>
                            <li>Rice - 1 cup</li>
                        </ul>
                    </details>
                    <button className='recipe-changer'>Change Recipe</button>
                </div>

                <div className='dinner-container'>  
                    <h1 className='recipe-header'>Dinner Recipe</h1>  
                    <p className='recipe-font'>Recipe Name</p>
                    <p className='recipe-font'>Recipe cuisine 💠 Time</p>
                    <details className='recipe-font'>
                        <summary>Ingredients</summary>
                        <ul>
                            <li>Rice - 1 cup</li>
                        </ul>
                    </details>
                    <button className='recipe-changer'>Change Recipe</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeeklyMealPlan
