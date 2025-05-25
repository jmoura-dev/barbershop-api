import { SchedulesRepository } from '@/domain/barbershop-scheduling/application/repositories/schedules-repository'
import { Schedule } from '@/domain/barbershop-scheduling/enterprise/entities/schedule'
import { PrismaScheduleMapper } from '../mappers/prisma-schedule-mapper'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaSchedulesRepository implements SchedulesRepository {
  constructor(private prisma: PrismaService) {}

  async create(schedule: Schedule): Promise<void> {
    const data = PrismaScheduleMapper.toPrisma(schedule)

    await this.prisma.schedule.create({
      data,
    })
  }

  async findById(scheduleId: string): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({
      where: {
        id: scheduleId,
      },
    })

    if (!schedule) {
      return null
    }

    return PrismaScheduleMapper.toDomain(schedule)
  }

  async delete(scheduleId: string): Promise<void> {
    await this.prisma.schedule.delete({
      where: {
        id: scheduleId,
      },
    })
  }
}
