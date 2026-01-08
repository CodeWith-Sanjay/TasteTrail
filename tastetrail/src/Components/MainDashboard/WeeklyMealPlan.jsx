import React, {useState, useEffect} from 'react'

import { currentWeekMealPlan } from '../../services/mealPlanServices.js';
import './weeklyMealPlan.css';

const WeeklyMealPlan = () => {

    const [mealPlan, setMealPlan] = useState(null);
    const [selectedDay, setSelectedDay] = useState('');

    useEffect(() => {
        const fetchCurrentWeekMealPlan = async () => {
            try {
                const res = await currentWeekMealPlan();

                if(res.success) {
                    setMealPlan(res.data)
                }
            } catch (error) {
                console.log('Error fetching current week meal plan: ', error.message);
            }
        }

        fetchCurrentWeekMealPlan()
    }, []);

    useEffect(() => {
        const todayIndex = new Date().getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        setSelectedDay(days[todayIndex])
    }, [])

    const dayMeals = mealPlan?.slots?.[selectedDay]
  return (
    <div className='weekly-plan-container'>
        <h1 className='weekly-plan-header'>Week Meal Plan</h1>

        <div className='recipe-day-container'>
            <div className="weekly-plan-day-selector">
                <p onClick={() => setSelectedDay('Sunday')} className={selectedDay === 'Sunday' ? 'active' : ''}>Sun</p>
                <p onClick={() => setSelectedDay('Monday')} className={selectedDay === 'Monday' ? 'active' : ''}>Mon</p>
                <p onClick={() => setSelectedDay('Tuesday')} className={selectedDay === 'Tuesday' ? 'active' : ''}>Tue</p>
                <p onClick={() => setSelectedDay('Wednesday')} className={selectedDay === 'Wednesday' ? 'active' : ''}>Wed</p>
                <p onClick={() => setSelectedDay('Thursday')} className={selectedDay === 'Thursday' ? 'active' : ''}>Thur</p>
                <p onClick={() => setSelectedDay('Friday')} className={selectedDay === 'Friday' ? 'active' : ''}>Fri</p>
                <p onClick={() => setSelectedDay('Saturday')} className={selectedDay === 'Saturday' ? 'active' : ''}>Sat</p>
            </div>

            <div className='recipe-plan-container'>
                {dayMeals?.breakfast && (
                <div className='breakfast-container'>    
                    <h1 className='recipe-header'>Breakfast Recipe</h1>
                    <p className='recipe-font'>{dayMeals.breakfast.name}</p>
                    <p className='recipe-font'>{dayMeals.breakfast.cuisines} 💠 {dayMeals.breakfast.totalTime} mins</p>
                    <details className='recipe-font'>
                        <summary>Ingredients</summary>
                        <ul>
                            {dayMeals.breakfast.ingredients.map((ing, index) => (
                                <li key={index}>
                                    {ing.name} - {ing.quantity}
                                </li>
                            ))}
                        </ul>
                    </details>
                    <button className='recipe-changer'>Change Recipe</button>
                </div>
                )}

                {dayMeals?.lunch && (
                <div className='lunch-container'>    
                    <h1 className='recipe-header'>Lunch Recipe</h1>
                    <p className='recipe-font'>{dayMeals.lunch.name}</p>
                    <p className='recipe-font'>{dayMeals.lunch.cuisines} 💠 {dayMeals.lunch.totalTime} mins</p>
                    <details className='recipe-font'>
                        <summary>Ingredients</summary>
                        <ul>
                            {dayMeals.lunch.ingredients.map((ing, index) => (
                                <li key={index}>
                                    {ing.name} - {ing.quantity}
                                </li>
                            ))}
                        </ul>
                    </details>
                    <button className='recipe-changer'>Change Recipe</button>
                </div>
                )}

                {dayMeals?.dinner && (
                <div className='dinner-container'>    
                    <h1 className='recipe-header'>Dinner Recipe</h1>
                    <p className='recipe-font'>{dayMeals.dinner.name}</p>
                    <p className='recipe-font'>{dayMeals.dinner.cuisines} 💠 {dayMeals.dinner.totalTime} mins</p>
                    <details className='recipe-font'>
                        <summary>Ingredients</summary>
                        <ul>
                            {dayMeals.dinner.ingredients.map((ing, index) => (
                                <li key={index}>
                                    {ing.name} - {ing.quantity}
                                </li>
                            ))}
                        </ul>
                    </details>
                    <button className='recipe-changer'>Change Recipe</button>
                </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default WeeklyMealPlan
