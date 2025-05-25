import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { Public } from '@/infra/auth/public'
import { AuthenticateUserUseCase } from '@/domain/barbershop-scheduling/application/use-cases/authenticate-user'
import { EmailAlreadyExists } from '@/domain/barbershop-scheduling/application/use-cases/errors/email-already-exists'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema)

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller()
export class AuthenticateController {
  constructor(private authenticateUseCate: AuthenticateUserUseCase) {}

  @Post('/sessions')
  @Public()
  async handle(@Body(bodyValidationPipe) body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUseCate.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EmailAlreadyExists:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken, user } = result.value

    return {
      user,
      access_token: accessToken,
    }
  }
}
