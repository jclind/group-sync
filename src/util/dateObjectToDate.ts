import { DateObject } from 'react-multi-date-picker'

export const dateObjectToDate = (obj: DateObject) => {
  const year = obj.year
  const month = obj.month.index
  const day = obj.day

  return new Date(year, month, day)
}
