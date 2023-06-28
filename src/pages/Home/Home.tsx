import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.scss'
import { useAuth } from '../../context/AuthContext'
import { logout } from '../../services/auth'

const Home = () => {
  const user = useAuth()?.user
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/')
      })
      .catch((err: any) => {
        // ! CATCH ERROR
      })
  }

  return (
    <div className='home-page'>
      <h1>Welcome to the Friends Party App!</h1>
      <p>Organize your parties and get-togethers with ease.</p>
      {user ? (
        <>
          <div className='button-group'>
            <Link to='/create-event' className='button'>
              + Create Event
            </Link>
            <Link to='/dashboard' className='button'>
              Dashboard
            </Link>
          </div>
          <button onClick={handleLogout} className='logout-btn'>
            Logout
          </button>
        </>
      ) : (
        <div className='button-group'>
          <Link to='/login' className='button'>
            Login
          </Link>
          <Link to='/signup' className='button'>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home
