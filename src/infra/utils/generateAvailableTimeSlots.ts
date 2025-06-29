import dayjs from 'dayjs'

export function generateAvailableTimeSlots(
  date: string,
  startTime: string,
  endTime: string,
  intervalMinutes: number,
): string[] {
  // const day = dayjs(date).day()
  // if (day === 0) {
  //   // Sunday: return empty slots or throw error
  //   return []
  // }

  const slots: string[] = []
  let current = dayjs(`${date}T${startTime}`)
  const end = dayjs(`${date}T${endTime}`)

  while (current.isBefore(end)) {
    slots.push(current.format('HH:mm'))
    current = current.add(intervalMinutes, 'minute')
  }

  return slots
}
