import { setMinutes, setHours } from 'date-fns'
export { add as addToDate } from 'date-fns'
export { intervalToDuration } from 'date-fns'

export const timeout = (time: number): Promise<void> => new Promise((res) => setTimeout(res, time))

export const setTimeToCompleteDate = (d: { date: Date; hours: number; minutes: number }): Date => {
  return setMinutes(setHours(d.date, d.hours), d.minutes)
}

export const getTimeToCompleteString = (d: Date) => {
  const hours = d.getHours()
  const minutes = d.getMinutes()

  if (hours === 0) {
    return `${minutes} мин.`
  }

  if (minutes === 0) {
    return `${hours}ч.`
  }

  return `${hours}ч. ${minutes} мин.`
}
