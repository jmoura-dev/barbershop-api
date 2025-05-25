import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ClientsRepository } from '../repositories/clients-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { UserRoot } from '../../enterprise/entities/user-root'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
    user: UserRoot
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private clientsRepository: ClientsRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.clientsRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const checkedPassword = await this.hashComparer.compare(
      password,
      user.password_hash,
    )

    if (!checkedPassword) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      user,
      accessToken,
    })
  }
}
