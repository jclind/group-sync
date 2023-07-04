import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventType } from '../../../types'
import { getEvent } from '../../services/event'
import './Event.scss'
import { getMonthAndDay } from '../../util/getMonthAndDay'
import { BsFillHouseFill } from 'react-icons/bs'
import {
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai'
import { getUsername } from '../../services/auth'
import { getDayName } from '../../util/getDayName'
import DateCard from '../../components/DateCard/DateCard'

const EventPage = () => {
  const { eventID } = useParams()

  const [event, setEvent] = useState<EventType | null>(null)
  const [pageExists, setPageExists] = useState(true)
  const [authorUsername, setAuthorUsername] = useState<string | null>(null)

  const getEventData = async (eventID: string) => {
    try {
      const eventData: EventType = await getEvent(eventID)
      if (eventData?.eventCreatorUID) {
        const username: string | null = await getUsername(
          eventData.eventCreatorUID
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

  if (!event) {
    return <div>Loading...</div>
  }
  if (!pageExists) {
    return <div>Event not found.</div>
  }

  const { name, description, locationName, address, dates, eventCreatorUID } =
    event
  console.log(dates)

  return (
    <div className='event-page-container'>
      <div className='event-container'>
        <div className='event-details'>
          <h2>{name} title</h2>
          {/* <p>
            Description: {description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Libero nam cupiditate quod laudantium sequi.
            Quisquam.
          </p> */}
          <div className='event-creator'>
            {/* <AiOutlineUser className='icon' /> */}
            Event Creator: {authorUsername}
          </div>
          <div className='location-container'>
            <BsFillHouseFill className='icon' />
            <div className='location'>
              <p className='location-name'>{locationName}</p>
              {address && (
                <p className='address'>Address: {address.formatted_address}</p>
              )}
            </div>
          </div>
        </div>
        <div className='date-range-container'>
          <p>Date Range:</p>
          <div className='date-range'>
            {dates.map(date => {
              return <DateCard date={date} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage
