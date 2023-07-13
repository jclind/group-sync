import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  AvailabilityObjectType,
  EventType,
  UserLocalDataType,
} from '../../../types'
import {
  getEvent,
  getUserAvailability,
  setUserAvailability,
} from '../../services/event'
import './Event.scss'
import { BsFillHouseFill } from 'react-icons/bs'
import { getUsername, isCurrUserSignedIn } from '../../services/auth'
import DateCard from '../../components/DateCard/DateCard'
import UserDataModal from '../../components/UserDataModal/UserDataModal'
import { auth } from '../../services/firestore'
import EventUsersList from '../../components/EventUsersList/EventUsersList'
import EventUserCard from '../../components/EventUsersList/EventUserCard'
import EventChat from '../../components/EventChat/EventChat'

const EventPage = () => {
  const { eventID } = useParams()

  const [event, setEvent] = useState<EventType | null>(null)
  const [pageExists, setPageExists] = useState(true)
  const [authorUsername, setAuthorUsername] = useState<string | null>(null)
  const [currUserIsAuthor, setCurrUserIsAuthor] = useState(true)

  const [currUserID, setCurrUserID] = useState('')
  const [isUserDataModalOpen, setIsUserDataModalOpen] = useState(false)
  const [currUserAvailability, setCurrUserAvailability] = useState<
    undefined | AvailabilityObjectType[]
  >(undefined)

  const getEventData = async (eventID: string) => {
    try {
      const eventData: EventType = await getEvent(eventID)
      if (eventData?.authorData.uid) {
        setCurrUserIsAuthor(isCurrUserSignedIn(eventData.authorData.uid))
        const username: string | null = await getUsername(
          eventData.authorData.uid
        )
        setAuthorUsername(username)
      }
      if (eventData) setEvent(eventData)
      else setPageExists(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!eventID) return setPageExists(false)
    getEventData(eventID)
  }, [])

  useEffect(() => {
    if (!event && eventID) {
      const localUserData =
        localStorage.GROUP_SYNC_USER_DATA === undefined
          ? null
          : JSON.parse(localStorage.getItem('GROUP_SYNC_USER_DATA') || '')

      const currUID: string =
        currUserIsAuthor || auth?.currentUser?.uid || localUserData?.uid
      // If the current user is the author or is signed in at all or has entered their information (in localStorage), don't show the data modal
      if (!currUID) {
        setIsUserDataModalOpen(true)
      } else if (!currUserIsAuthor) {
        getUserAvailability(eventID, currUID).then(res => {
          if (res) {
            setCurrUserAvailability(res)
          }
        })
      }
      if (currUID) setCurrUserID(currUID)
    }
  }, [currUserIsAuthor])

  const setUserLocalStorage = (data: UserLocalDataType) => {
    if (data.uid !== currUserID) setCurrUserID(data.uid)
    localStorage.setItem('GROUP_SYNC_USER_DATA', JSON.stringify(data))
  }
  const updateAvailability = (data: AvailabilityObjectType) => {
    if (!currUserID || !eventID)
      throw new Error('User Must Give Name To Mark Availability')
    setUserAvailability(eventID, currUserID, data)
  }

  if (!event) {
    return <div>Loading...</div>
  }
  if (!pageExists) {
    return <div>Event not found.</div>
  }

  const { name, description, locationName, address, dates, authorData } = event

  return (
    <div className='event-page-container'>
      <div className='event-container'>
        <div className='header'>
          <div className='event-details card'>
            <h2>{name}</h2>
            {/* <p>
            Description: {description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Libero nam cupiditate quod laudantium sequi.
            Quisquam.
          </p> */}
            <div className='bottom'>
              <div className='location-container'>
                <div className='location-data'>
                  <BsFillHouseFill className='icon' />
                  <div className='location'>
                    <p className='location-name'>{locationName}</p>
                    {address && (
                      <p className='address'>{address.formatted_address}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className='event-creator'>
                {/* <AiOutlineUser className='icon' /> */}
                <label>Event Creator:</label>
                <EventUserCard user={{ name: authorData.name }} />
                {/* <span>{authorUsername}</span> */}
              </div>
            </div>
          </div>
          <div className='users-list'>
            <EventUsersList eventID={eventID!} />
          </div>
        </div>

        <div className='dates-container'>
          {currUserIsAuthor ? (
            'AUTHOR'
          ) : (
            <div className='date-range-container'>
              <p>Date Range:</p>
              <div className='date-range'>
                {dates.map(date => {
                  return (
                    <DateCard
                      date={date}
                      updateAvailability={updateAvailability}
                    />
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <UserDataModal
        isOpen={isUserDataModalOpen}
        setIsOpen={setIsUserDataModalOpen}
        setUserLocalStorage={setUserLocalStorage}
      />
      <EventChat eventID={eventID!} />
    </div>
  )
}

export default EventPage
