import React from 'react'

import MainHeroPic from '../../assets/MainHero.jpg';
import './mainHero.css';

const MainHero = () => {
  return (
    <div className='mainHero-container'>
      <img src={MainHeroPic} className='main-hero-img' alt='Main-Hero-Image'/>

      <div>
        <h1>Today's Recipe</h1>
      </div>
    </div>
  )
}

export default MainHero
