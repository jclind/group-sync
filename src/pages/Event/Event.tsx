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
            {dates.map(val => {
              console.log(val)
              return (
                <div className='date-card'>
                  <div className='date'>{getMonthAndDay(val)}</div>
                  <div className='day-name'>({getDayName(val)})</div>
                  <div className='options'>
                    <button className='not-available btn-no-styles'>
                      Busy
                    </button>
                    <button className='available btn-no-styles'>
                      Available
                    </button>

                    {/* <button className='btn-no-styles'>
                      <AiOutlineCloseCircle className='decline icon' />
                    </button>

                    <button className='btn-no-styles'>
                      <AiOutlineInfoCircle className='maybe icon' />
                    </button>

                    <button className='btn-no-styles'>
                      <AiOutlineCheckCircle className='accept icon' />
                    </button> */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage
