import React, { useEffect, useState } from 'react'
import { getMonthAndDay } from '../../util/getMonthAndDay'
import { getDayName } from '../../util/getDayName'
import './DateCard.scss'
import { AvailabilityObjectType, AvailabilityType } from '../../../types'

type DateCardProps = {
  date: string
  defaultStatus?: AvailabilityType
  updateAvailability: (data: AvailabilityObjectType) => void
}

const DateCard = ({
  date,
  defaultStatus,
  updateAvailability,
}: DateCardProps) => {
  const [status, setStatus] = useState<string>('NOT_SET')

  const handleUpdateStatus = (type: AvailabilityType) => {
    if (type !== status) {
      setStatus(type)
      const availabilityData = { date, type }
      updateAvailability(availabilityData)
    }
  }

  return (
    <div className={`date-card ${status}`}>
      <div className='date'>{getMonthAndDay(date)}</div>
      <div className='day-name'>({getDayName(date)})</div>
      <div className='options'>
        <div className='main-options'>
          <button
            className='busy btn-no-styles'
            onClick={() => handleUpdateStatus('BUSY')}
          >
            Busy
          </button>
          <button
            className='available btn-no-styles'
            onClick={() => handleUpdateStatus('AVAILABLE')}
          >
            Available
          </button>
        </div>
        <button
          className='maybe btn-no-styles'
          onClick={() => handleUpdateStatus('MAYBE')}
        >
          maybe
        </button>
      </div>
    </div>
  )
}

export default DateCard
