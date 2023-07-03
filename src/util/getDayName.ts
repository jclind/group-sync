export const getDayName = (date: Date | string): string => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const d = new Date(date)
  const dayIndex = d.getDay()

  return daysOfWeek[dayIndex]
}
