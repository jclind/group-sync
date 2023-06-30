import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../../services/event'

import './CreateEvent.scss'
import { getMonthAndDay } from '../../util/getMonthAndDay'
import FormInput from '../../components/FormInput/FormInput'
import FormTextArea from '../../components/FormTextArea/FormTextArea'
import Autocomplete from 'react-google-autocomplete'
import dayjs, { Dayjs } from 'dayjs'
import { RangePickerProps } from 'antd/es/date-picker'
import { AddressType } from '../../../types'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker
const disabledDate: RangePickerProps['disabledDate'] = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current < dayjs().subtract(1, 'day').endOf('day')
}

function CreateEvent() {
  const [eventName, setEventName] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [locationName, setLocationName] = useState('')
  const [showAddress, setShowAddress] = useState(false)
  const [eventAddress, setEventAddress] = useState<AddressType | null>(null)

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleCreateEvent = async (e: any) => {
    e.preventDefault()
    if (!eventName || !startDate || !endDate) {
      setError('Please fill in all fields.')
      return
    }

    try {
      // Get subset of 'eventAddress' object properties
      const address: AddressType | null = eventAddress
        ? (({ address_components, formatted_address }) => ({
            address_components,
            formatted_address,
          }))(eventAddress)
        : null

      const inviteLink = await createEvent(
        eventName,
        eventDescription,
        locationName,
        address,
        startDate,
        endDate
      )
      navigate('/event-created', { state: { inviteLink } })
    } catch (error) {
      setError('Failed to create the event.')
    }
  }

  return (
    <div className='create-event-page'>
      <h2>Create Event</h2>
      <form className='create-event-form' onSubmit={handleCreateEvent}>
        <section>
          <FormInput
            label='Event Name'
            type='string'
            placeholder='Ping Pong Madness'
            value={eventName}
            setValue={setEventName}
          />
          <FormTextArea
            label='Event Details'
            placeholder='Event Details'
            value={eventDescription}
            setValue={setEventDescription}
          />
        </section>
        <section>
          <FormInput
            label='Location Name'
            placeholder="Sam's House"
            type='text'
            value={locationName}
            setValue={setLocationName}
          />
          {showAddress ? (
            <div className='address-container'>
              <label className='form-label'>Address</label>
              <Autocomplete
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                onPlaceSelected={place => {
                  const selectedAddress: AddressType = (({
                    address_components,
                    formatted_address,
                  }) => ({
                    address_components,
                    formatted_address,
                  }))(place)
                  setEventAddress(selectedAddress)
                }}
                options={{
                  types: ['geocode', 'establishment'],
                }}
                className='address-autocomplete'
              />

              <button
                type='button'
                onClick={() => setShowAddress(false)}
                className='remove-address-button'
              >
                - Remove Address
              </button>
            </div>
          ) : (
            <button
              type='button'
              onClick={() => setShowAddress(true)}
              className='add-address-button'
            >
              + Add Address
            </button>
          )}
        </section>
        <div className='date-range-picker-container'>
          <div className='form-label'>Select Dates</div>
          <RangePicker
            disabledDate={disabledDate}
            style={{ border: '1px solid #ccc', padding: '9px' }}
            format={'MMM D'}
            onChange={val => {
              if (val) {
                const s = val[0]?.toString()
                const e = val[1]?.toString()
                console.log(s, e)
                s && setStartDate(s)
                e && setEndDate(e)
              }
            }}
          />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <button type='submit' className='button'>
          Create Event
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
