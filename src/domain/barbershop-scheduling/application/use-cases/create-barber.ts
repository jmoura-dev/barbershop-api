import { left, right, type Either } from '@/core/either'
import { BarbersRepository } from '../repositories/barbers-repository'
import { EmailAlreadyExists } from './errors/email-already-exists'
import { Barber } from '../../enterprise/entities/barber'
import { Injectable } from '@nestjs/common'

interface CreateBarberUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp_number: string
  role: string
}

type CreateBarberUseCaseResponse = Either<EmailAlreadyExists, null>

@Injectable()
export class CreateBarberUseCase {
  constructor(private barbersRepository: BarbersRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp_number,
    role,
  }: CreateBarberUseCaseRequest): Promise<CreateBarberUseCaseResponse> {
    const barber = Barber.create({
      name,
      email,
      password_hash: password,
      whatsapp_number,
      role,
    })

    const barberWithSameEmail = await this.barbersRepository.findByEmail(email)

    if (barberWithSameEmail) {
      return left(new EmailAlreadyExists(email))
    }

    await this.barbersRepository.create(barber)

    return right(null)
  }
}
