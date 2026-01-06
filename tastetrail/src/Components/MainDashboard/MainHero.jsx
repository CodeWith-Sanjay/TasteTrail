import React, {useState, useEffect} from 'react'

import { getTodayRecipe } from '../../services/dashboardService.js';
import Loader from '../../Components/Loader/Loader.jsx';
import MainHeroPic from '../../assets/MainHero.jpg';
import './mainHero.css';

const MainHero = () => {

  const [todayRecipe, setTodayRecipe] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchTodayRecipe = async () => {
      try {
        setLoader(true);
        const res = await getTodayRecipe();

        if(res.success) {
          setTodayRecipe(res.data)
          setMeta(res.meta)
        }
      } finally {
        setLoader(false)
      }
    }

    fetchTodayRecipe()
  }, []);

  if(loader) {
    return (
      <div className='page-loader'>
        <Loader />
      </div>
    )
  }

  if(!todayRecipe) {
    return (
      <div>
        <p style={{textAlign: 'center'}}>No recipes found</p>
      </div>
    )
  }

  if(meta?.fallback) {
    return (
      <small className="hero-hint">
        Popular recipe today
      </small>
    )
  }


  return (
    <div className='mainHero-container'>

      <div className="hero-image-wrapper">
        <img src={MainHeroPic} className='main-hero-img' alt='Main-Hero-Image'/>

        <div className='main-hero-recipe-container'>
          
          {meta?.fallbackLevel !== 'strict' ? (
            <h1 className="hero-hint">Popular right now</h1>
          ) : <h1>Today's Special</h1>} 

          <p className='recipe-title'>{todayRecipe.recipeName}</p>

          <p className='recipe-meta'>{todayRecipe.cuisines.join(', ')} 💠 {todayRecipe.totalTime} mins 💠 {todayRecipe.category}</p>

          <p className='recipe-description'>{todayRecipe.description}</p>

          <details className='ingredients-box'>
            <summary>View Ingredients</summary>
            <div className="ingredients-content">
              <ul>
                {todayRecipe.ingredients.map(item => (
                  <li key={item._id}>
                    {item.name} - {item.quantity} {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          </details>

        </div>
      </div>
    </div>
  )
}

export default MainHero
