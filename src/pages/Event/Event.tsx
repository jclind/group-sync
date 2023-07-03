import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventType } from '../../../types'
import { getEvent } from '../../services/event'
import './Event.scss'
import { getMonthAndDay } from '../../util/getMonthAndDay'

const EventPage = () => {
  const { eventID } = useParams()

  const [event, setEvent] = useState<EventType | null>(null)
  const [pageExists, setPageExists] = useState(true)

  const getEventData = async (eventID: string) => {
    try {
      const eventData: EventType = await getEvent(eventID)
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
      <h2>{name}</h2>
      <p>Description: {description}</p>
      <p>Location: {locationName}</p>
      {address && <p>Address: {address.formatted_address}</p>}
      <div className='date-range'>
        <p>Date Range:</p>
        {dates.map(val => {
          console.log(val)
          return <div>{getMonthAndDay(val)}</div>
        })}
      </div>
    </div>
  )
}

export default EventPage
