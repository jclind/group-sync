import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import { signInWithEmailAndPassword } from '../auth'

import './Login.scss'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginDefault } from '../../services/auth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const user = useAuth()?.user

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      await loginDefault(email, password)
    } catch (error: any) {
      setError(error)
    }
  }

  return user ? (
    <Navigate to='/' />
  ) : (
    <div className='login-page'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <p className='error-message'>{error}</p>}
        <button type='submit' className='button'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
