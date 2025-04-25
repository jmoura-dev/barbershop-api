import { faker } from '@faker-js/faker'
import {
  Schedule,
  type ScheduleProps,
} from '@/domain/barbershop-scheduling/enterprise/entities/schedule'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeSchedule(
  override: Partial<ScheduleProps> = {},
  id?: UniqueEntityID,
) {
  const schedule = Schedule.create(
    {
      clientId: new UniqueEntityID(),
      appointmentTime: faker.lorem.word(),
      cutValue: faker.number.float({ min: 10, max: 50 }),
      status: true,
      typeOfCut: faker.lorem.word(),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return schedule
}
