import { Schedule } from '@/domain/barbershop-scheduling/enterprise/entities/schedule'
import { left, right, type Either } from '@/core/either'
import type { SchedulesRepository } from '../repositories/schedules-repository'
import { ClientNotFoundError } from './errors/client-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateScheduleUseCaseRequest {
  clientId: string
  appointmentTime: string
  cutValue: number
  status: boolean
  typeOfCut: string
}

type CreateScheduleUseCaseResponse = Either<ClientNotFoundError, null>

export class CreateScheduleUseCase {
  constructor(private schedulesRepository: SchedulesRepository) {}

  async execute({
    clientId,
    appointmentTime,
    cutValue,
    status,
    typeOfCut,
  }: CreateScheduleUseCaseRequest): Promise<CreateScheduleUseCaseResponse> {
    const schedule = Schedule.create({
      clientId: new UniqueEntityID(clientId),
      appointmentTime,
      cutValue,
      status,
      typeOfCut,
    })

    const doesClientExists = await this.schedulesRepository.findById(clientId)

    if (!doesClientExists) {
      return left(new ClientNotFoundError())
    }

    await this.schedulesRepository.create(schedule)

    return right(null)
  }
}
