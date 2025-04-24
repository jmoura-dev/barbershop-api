import type { Schedule } from '../../enterprise/entities/schedule'

export interface SchedulesRepository {
  create(schedule: Schedule): Promise<void>
  findById(scheduleId: string): Promise<Schedule | null>
  delete(scheduleId: string): Promise<void>
}
