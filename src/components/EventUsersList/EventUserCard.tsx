import React from 'react'
import { UsersAttendingType } from '../../../types'
import './EventUsersList.scss'

type EventUserCardProps = {
  user: UsersAttendingType
}
const EventUserCard = ({ user }: EventUserCardProps) => {
  const { name } = user
  const userInitials = name
    .split(' ')
    .map(n => n[0])
    .join('')
  return (
    <div className='user-card'>
      <div className='profile-img'>{userInitials}</div>
      <div className='name'>{name}</div>
    </div>
  )
}

export default EventUserCard
