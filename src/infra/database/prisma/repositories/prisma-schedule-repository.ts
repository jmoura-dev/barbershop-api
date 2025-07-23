import { SchedulesRepository } from '@/domain/barbershop-scheduling/application/repositories/schedules-repository'
import { Schedule } from '@/domain/barbershop-scheduling/enterprise/entities/schedule'
import { PrismaScheduleMapper } from '../mappers/prisma-schedule-mapper'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { generateAvailableTimeSlots } from '@/infra/utils/generateAvailableTimeSlots'
import dayjs from 'dayjs'

@Injectable()
export class PrismaSchedulesRepository implements SchedulesRepository {
  constructor(private prisma: PrismaService) {}

  async getAvailableSlotsForDay(date: string) {
    const workingHours = generateAvailableTimeSlots(date, '09:00', '18:00', 30)

    const appointments = await this.prisma.schedule.findMany({
      where: { date: dayjs(date).format('YYYY-MM-DD') },
      select: { time: true },
    })

    const bookedTimes = appointments.map((appointment) => appointment.time)

    const availableSlots = workingHours.filter(
      (slot) => !bookedTimes.includes(slot),
    )

    return availableSlots
  }

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
