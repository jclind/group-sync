import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import CreateEvent from './pages/CreateEvent/CreateEvent'

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/create-event' element={<CreateEvent />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
