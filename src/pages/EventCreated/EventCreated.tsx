import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineLink } from 'react-icons/ai'
import './EventCreated.scss'

const EventCreated = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const inviteLink = location.state.inviteLink

  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    const textToCopy = inviteLink // Replace with the text you want to copy

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 3000) // Reset "Copied" text after 3 seconds
      })
      .catch(error => {
        console.log('Copy failed:', error)
      })
  }

  if (!inviteLink) {
    navigate('/dashboard')
  }

  return (
    <div className='event-created-container'>
      <h1>Event Created!</h1>
      <p>Invite your friends with this link:</p>
      <div className='invite-link-container'>
        <div className='icon-container'>
          <AiOutlineLink />
        </div>
        <Link to={inviteLink} className='invite-link'>
          {inviteLink}
        </Link>
        <button
          className={`copy-link-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <Link to='/dashboard' className='dashboard-link'>
        Go to Dashboard
      </Link>
    </div>
  )
}

export default EventCreated
