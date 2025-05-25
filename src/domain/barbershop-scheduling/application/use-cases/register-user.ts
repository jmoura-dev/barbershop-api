import { left, right, type Either } from '@/core/either'
import { EmailAlreadyExists } from './errors/email-already-exists'
import { UserRoot } from '../../enterprise/entities/user-root'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterUsersUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp_number: string
  role?: string
}

type RegisterUsersUseCaseResponse = Either<EmailAlreadyExists, null>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
    whatsapp_number,
    role,
  }: RegisterUsersUseCaseRequest): Promise<RegisterUsersUseCaseResponse> {
    const password_hash = await this.hashGenerator.hash(password)

    const user = UserRoot.create({
      name,
      email,
      password_hash,
      whatsapp_number,
      role,
    })

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new EmailAlreadyExists(email))
    }

    await this.usersRepository.create(user)

    return right(null)
  }
}
