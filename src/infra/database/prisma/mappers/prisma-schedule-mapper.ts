import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Schedule } from '@/domain/barbershop-scheduling/enterprise/entities/schedule'
import { Prisma, Schedule as PrismaSchedule } from '@prisma/client'

export class PrismaScheduleMapper {
  static toDomain(raw: PrismaSchedule): Schedule {
    return Schedule.create(
      {
        clientId: new UniqueEntityID(raw.userId),
        date: raw.date,
        time: raw.time,
        cutValue: Number(raw.cutValue),
        status: raw.status,
        typeOfCut: raw.typeOfCut,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(schedule: Schedule): Prisma.ScheduleUncheckedCreateInput {
    return {
      id: schedule.id.toString(),
      userId: schedule.clientId.toString(),
      date: schedule.date,
      time: schedule.time,
      cutValue: schedule.cutValue,
      status: schedule.status,
      typeOfCut: schedule.typeOfCut,
      createdAt: schedule.createdAt,
    }
  }
}
