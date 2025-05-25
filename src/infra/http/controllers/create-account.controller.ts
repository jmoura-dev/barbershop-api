import { EmailAlreadyExists } from '@/domain/barbershop-scheduling/application/use-cases/errors/email-already-exists'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { RegisterUserUseCase } from '@/domain/barbershop-scheduling/application/use-cases/register-user'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
  whatsapp_number: z.string().min(8),
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller()
export class CreateAccountController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @Post('/users')
  @HttpCode(201)
  @Public()
  async handle(@Body(bodyValidationPipe) body: CreateAccountBodySchema) {
    const { name, email, password, role, whatsapp_number } = body

    const result = await this.registerUserUseCase.execute({
      name,
      email,
      password,
      role,
      whatsapp_number,
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
  }
}
