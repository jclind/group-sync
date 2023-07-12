import React, { useEffect, useState } from 'react'
import './EventUsersList.scss'
import { UsersAttendingType } from '../../../types'
import { getAttendingUsers } from '../../services/event'
import EventUserCard from './EventUserCard'

type EventUsersListProps = {
  eventID: string
}

const USERS_LIMIT = 8

const EventUsersList = ({ eventID }: EventUsersListProps) => {
  // const [users, setUsers] = useState<UsersAttendingType[] | null>(null)
  const [users, setUsers] = useState<UsersAttendingType[] | null>([
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Mike Johnson', email: 'mike@example.com' },
    { name: 'Sarah Brown' },
    { name: 'David Wilson', email: 'david@example.com' },
    { name: 'Emily Davis' },
    { name: 'Michael Miller', email: 'michael@example.com' },
    { name: 'Olivia Anderson', email: 'olivia@example.com' },
    { name: 'William Thompson' },
    { name: 'Sophia White', email: 'sophia@example.com' },
    { name: 'James Martinez', email: 'james@example.com' },
  ])

  const [viewAllUsers, setViewAllUsers] = useState('')

  // useEffect(() => {
  //   getAttendingUsers(eventID).then(res => {
  //     setUsers(res)
  //     console.log(res)
  //   })
  // }, [])

  return (
    <div className='event-users-container'>
      <div className='title'>People Attending</div>
      <div className='users-list'>
        {users &&
          users
            .slice(0, USERS_LIMIT)
            .map(user => <EventUserCard user={user} />)}
      </div>
      {users && users.length > USERS_LIMIT && (
        <button className='view-all-users btn-no-styles'>View All</button>
      )}
    </div>
  )
}

export default EventUsersList
