import { Schedule } from '@/domain/barbershop-scheduling/enterprise/entities/schedule'
import { left, right, type Either } from '@/core/either'
import { SchedulesRepository } from '../repositories/schedules-repository'
import { ClientNotFoundError } from './errors/client-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ClientsRepository } from '../repositories/clients-repository'
import { Injectable } from '@nestjs/common'

interface CreateScheduleUseCaseRequest {
  clientId: string
  appointmentTime: string
  cutValue: number
  status: boolean
  typeOfCut: string
}

type CreateScheduleUseCaseResponse = Either<ClientNotFoundError, null>

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    private schedulesRepository: SchedulesRepository,
    private clientsRepository: ClientsRepository,
  ) {}

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

    const doesClientExists = await this.clientsRepository.findById(clientId)

    if (!doesClientExists) {
      return left(new ClientNotFoundError())
    }

    await this.schedulesRepository.create(schedule)

    return right(null)
  }
}
