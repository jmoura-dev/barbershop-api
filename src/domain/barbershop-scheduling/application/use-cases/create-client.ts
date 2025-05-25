import { left, right, type Either } from '@/core/either'
import { ClientsRepository } from '../repositories/clients-repository'
import { EmailAlreadyExists } from './errors/email-already-exists'
import { Client } from '../../enterprise/entities/client'
import { Injectable } from '@nestjs/common'

interface CreateClientsUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp_number: string
  role: string
}

type CreateClientsUseCaseResponse = Either<EmailAlreadyExists, null>

@Injectable()
export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp_number,
    role,
  }: CreateClientsUseCaseRequest): Promise<CreateClientsUseCaseResponse> {
    const clients = Client.create({
      name,
      email,
      password_hash: password,
      whatsapp_number,
      role,
    })

    const clientsWithSameEmail = await this.clientsRepository.findByEmail(email)

    if (clientsWithSameEmail) {
      return left(new EmailAlreadyExists(email))
    }

    await this.clientsRepository.create(clients)

    return right(null)
  }
}
