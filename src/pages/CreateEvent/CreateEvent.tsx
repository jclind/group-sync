import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../../services/event'
import DateRangePicker, { DateRange } from 'rsuite/DateRangePicker'
import 'rsuite/dist/rsuite.min.css'

import './CreateEvent.scss'
import { getMonthAndDay } from '../../util/getMonthAndDay'

const { beforeToday } = DateRangePicker

function CreateEvent() {
  const [eventName, setEventName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleDateChange = (
    value: DateRange | null,
    event: SyntheticEvent<Element, Event>
  ) => {
    if (value && value.length === 2) {
      setStartDate(getMonthAndDay(value[0].toString()))
      setEndDate(getMonthAndDay(value[1].toString()))
    }
  }

  const handleCreateEvent = async (e: any) => {
    e.preventDefault()
    if (!eventName || !startDate || !endDate) {
      setError('Please fill in all fields.')
      return
    }

    try {
      await createEvent(eventName, startDate, endDate)
      navigate('/dashboard')
    } catch (error) {
      setError('Failed to create the event.')
    }
  }
  return (
    <div className='create-event-page'>
      <h2>Create Event</h2>
      <form className='create-event-form' onSubmit={handleCreateEvent}>
        <input
          type='text'
          placeholder='Event Name'
          value={eventName}
          onChange={e => setEventName(e.target.value)}
          required
        />
        {beforeToday ? (
          <DateRangePicker
            shouldDisableDate={beforeToday()}
            onChange={handleDateChange}
            placeholder='Select Dates'
            renderValue={val => {
              return startDate + ' - ' + endDate
            }}
          />
        ) : null}
        {error && <p className='error-message'>{error}</p>}
        <button type='submit' className='button'>
          Create Event
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
