import { Either, left, right } from '@/core/either'
import { SchedulesRepository } from '../repositories/schedules-repository'
import { UsersRepository } from '../repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found-erro'
import { Injectable } from '@nestjs/common'

interface GetAvailableSlotsForDayUseCaseRequest {
  userId: string
  date: string
}

type GetAvailableSlotsForDayUseCaseResponse = Either<
  UserNotFoundError | Error,
  {
    availableSlots: string[]
  }
>

@Injectable()
export class GetAvailableSlotsForDayUseCase {
  constructor(
    private schedulesRepository: SchedulesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    date,
  }: GetAvailableSlotsForDayUseCaseRequest): Promise<GetAvailableSlotsForDayUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    const availableSlots =
      await this.schedulesRepository.getAvailableSlotsForDay(date)

    return right({ availableSlots })
  }
}
