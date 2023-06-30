import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventType } from '../../../types'
import { getEvent } from '../../services/event'

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

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Location: {event.locationName}</p>
      {/* Display other party details as needed */}
    </div>
  )
}

export default EventPage
