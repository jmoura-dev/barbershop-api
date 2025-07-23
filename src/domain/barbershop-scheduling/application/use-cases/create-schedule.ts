import { Schedule } from '@/domain/barbershop-scheduling/enterprise/entities/schedule'
import { left, right, type Either } from '@/core/either'
import { SchedulesRepository } from '../repositories/schedules-repository'
import { ClientNotFoundError } from './errors/client-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { TimeSlotIsNotAvailable } from './errors/time-slot-is-not-available.error'

interface CreateScheduleUseCaseRequest {
  clientId: string
  date: string
  time: string
  cutValue: number
  status: boolean
  typeOfCut: string
}

type CreateScheduleUseCaseResponse = Either<
  ClientNotFoundError | TimeSlotIsNotAvailable,
  null
>

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    private schedulesRepository: SchedulesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    clientId,
    date,
    time,
    cutValue,
    status,
    typeOfCut,
  }: CreateScheduleUseCaseRequest): Promise<CreateScheduleUseCaseResponse> {
    const schedule = Schedule.create({
      clientId: new UniqueEntityID(clientId),
      date,
      time,
      cutValue,
      status,
      typeOfCut,
    })

    const doesClientExists = await this.usersRepository.findById(clientId)

    if (!doesClientExists) {
      return left(new ClientNotFoundError())
    }

    const schedules = await this.schedulesRepository.getAvailableSlotsForDay(
      new Date().toString(),
    )

    const isTimeSlotAvailable = schedules.includes(time)

    if (!isTimeSlotAvailable) {
      return left(new TimeSlotIsNotAvailable(time))
    }

    await this.schedulesRepository.create(schedule)

    return right(null)
  }
}
