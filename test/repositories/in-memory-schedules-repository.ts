import type { SchedulesRepository } from '@/domain/barbershop-scheduling/application/repositories/schedules-repository'
import type { Schedule } from '@/domain/barbershop-scheduling/enterprise/entities/schedule'
import { generateAvailableTimeSlots } from '@/infra/utils/generateAvailableTimeSlots'
import dayjs from 'dayjs'

export class InMemorySchedulesRepository implements SchedulesRepository {
  public items: Schedule[] = []

  async getAvailableSlotsForDay(date: string): Promise<string[]> {
    const workingHours = generateAvailableTimeSlots(date, '09:00', '18:00', 30)

    const appointments = this.items.filter((item) => item.date === date)

    const bookedTimes = appointments.map((appointment) =>
      dayjs(appointment.time).format('HH:mm'),
    )

    const availableSlots = workingHours.filter(
      (slot) => !bookedTimes.includes(slot),
    )

    return availableSlots
  }

  async create(schedule: Schedule): Promise<void> {
    this.items.push(schedule)
  }

  async findById(scheduleId: string): Promise<Schedule | null> {
    const schedule = this.items.find(
      (item) => item.id.toString() === scheduleId,
    )

    if (!schedule) {
      return null
    }

    return schedule
  }

  async delete(scheduleId: string): Promise<void> {
    this.items.filter((item) => item.id.toString() !== scheduleId)
  }
}
