import type { SchedulesRepository } from '@/domain/barbershop-scheduling/application/repositories/schedules-repository'
import type { Schedule } from '@/domain/barbershop-scheduling/enterprise/entities/schedule'

export class InMemorySchedulesRepository implements SchedulesRepository {
  public items: Schedule[] = []

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
