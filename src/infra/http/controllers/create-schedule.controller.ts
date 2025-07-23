import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { CreateScheduleUseCase } from '@/domain/barbershop-scheduling/application/use-cases/create-schedule'
import { ClientNotFoundError } from '@/domain/barbershop-scheduling/application/use-cases/errors/client-not-found-error'

const createScheduleBodySchema = z.object({
  date: z.string(),
  time: z.string(),
  cutValue: z.number(),
  typeOfCut: z.string(),
  status: z.boolean(),
})

const bodyValidationPipe = new ZodValidationPipe(createScheduleBodySchema)

type CreateScheduleBodySchema = z.infer<typeof createScheduleBodySchema>

@Controller()
export class CreateScheduleController {
  constructor(private createSchedule: CreateScheduleUseCase) {}

  @Post('/schedules')
  @HttpCode(201)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateScheduleBodySchema,
  ) {
    const { sub: userId } = user
    const { date, time, cutValue, status, typeOfCut } = body

    const result = await this.createSchedule.execute({
      clientId: userId,
      date,
      time,
      cutValue,
      status,
      typeOfCut,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ClientNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
