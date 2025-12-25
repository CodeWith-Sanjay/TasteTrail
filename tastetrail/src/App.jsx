import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import LandingPage from './Components/LandingPage.jsx'
import DashboardLayout from './Pages/DashboardLayout.jsx'
import RegisterLoginLayout from './Pages/RegisterLoginLayout.jsx'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import MainDashboard from './Components/MainDashboard.jsx'

function App() {

  return (
    <div className='main-container'>

      <BrowserRouter>

        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path='/' element={<LandingPage />}/>
            <Route path='/dashboard' element={<MainDashboard />} />
          </Route>

          <Route element={<RegisterLoginLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          
        </Routes>
        
      </BrowserRouter>

    </div>
  )
}

export default App
