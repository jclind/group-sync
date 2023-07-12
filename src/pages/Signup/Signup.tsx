import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './Signup.scss'
import { signUpDefault } from '../../services/auth'
import { useAuth } from '../../context/AuthContext'

function Signup() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const user = useAuth()?.user

  const handleSignup = async (e: any) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      await signUpDefault(email, password, name, username)
      // await signUpWithEmailAndPassword(email, password)
      // history.push('/dashboard')
    } catch (error) {
      console.log(error)
      setError('Failed to create an account.')
    }
  }

  return user ? (
    <Navigate to='/' />
  ) : (
    <div className='signup-page'>
      <h2>Sign Up</h2>
      <form className='signup-form' onSubmit={handleSignup}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
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
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className='error-message'>{error}</p>}
        <button type='submit' className='button'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
