import type { Schedule } from '../../enterprise/entities/schedule'

export abstract class SchedulesRepository {
  abstract create(schedule: Schedule): Promise<void>
  abstract findById(scheduleId: string): Promise<Schedule | null>
  abstract delete(scheduleId: string): Promise<void>
}
