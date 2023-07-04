import React, { useEffect, useState } from 'react'
import { getMonthAndDay } from '../../util/getMonthAndDay'
import { getDayName } from '../../util/getDayName'
import './DateCard.scss'

type DateCardProps = {
  date: string
}

const STATE_STATUS = {
  NOT_SET: 'NOT_SET',
  AVAILABLE: 'AVAILABLE',
  MAYBE: 'MAYBE',
  BUSY: 'BUSY',
}

const DateCard = ({ date }: DateCardProps) => {
  const [status, setStatus] = useState<string>(STATE_STATUS.NOT_SET)

  useEffect(() => {
    console.log(status)
  }, [status])

  return (
    <div className={`date-card ${status}`}>
      <div className='date'>{getMonthAndDay(date)}</div>
      <div className='day-name'>({getDayName(date)})</div>
      <div className='options'>
        <div className='main-options'>
          <button
            className='busy btn-no-styles'
            onClick={() => setStatus(STATE_STATUS.BUSY)}
          >
            Busy
          </button>
          <button
            className='available btn-no-styles'
            onClick={() => setStatus(STATE_STATUS.AVAILABLE)}
          >
            Available
          </button>
        </div>
        <button
          className='maybe btn-no-styles'
          onClick={() => setStatus(STATE_STATUS.MAYBE)}
        >
          maybe
        </button>
      </div>
    </div>
  )
}

export default DateCard
