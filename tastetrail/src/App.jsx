import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import LandingPage from './Components/LandingPage.jsx'
import DashboardLayout from './Pages/DashboardLayout.jsx'

function App() {

  return (
    <div className='main-container'>

      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path='/' element={<LandingPage />}/>
          </Route>
        </Routes>
        
      </BrowserRouter>

    </div>
  )
}

export default App
