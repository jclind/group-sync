import { DateObject } from 'react-multi-date-picker'

export const dateObjectToString = (obj: DateObject) => {
  const year = obj.year
  const month = obj.month.index
  const day = obj.day

  const date = new Date(year, month, day)
  return date.toString()
}
