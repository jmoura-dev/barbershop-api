import { left, right, type Either } from '@/core/either'
import { AdministratorsRepository } from '../repositories/administrators-repository'
import { EmailAlreadyExists } from './errors/email-already-exists'
import { Administrator } from '../../enterprise/entities/administrator'
import { Injectable } from '@nestjs/common'

interface CreateAdministratorUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp_number: string
  role: string
}

type CreateAdministratorUseCaseResponse = Either<EmailAlreadyExists, null>

@Injectable()
export class CreateAdministratorUseCase {
  constructor(private administratorsRepository: AdministratorsRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp_number,
    role,
  }: CreateAdministratorUseCaseRequest): Promise<CreateAdministratorUseCaseResponse> {
    const administrator = Administrator.create({
      name,
      email,
      password_hash: password,
      whatsapp_number,
      role,
    })

    const administratorWithSameEmail =
      await this.administratorsRepository.findByEmail(email)

    if (administratorWithSameEmail) {
      return left(new EmailAlreadyExists(email))
    }

    await this.administratorsRepository.create(administrator)

    return right(null)
  }
}
