import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { GetAvailableSlotsForDayUseCase } from '@/domain/barbershop-scheduling/application/use-cases/get-available-slots-for-day'
import { UserNotFoundError } from '@/domain/barbershop-scheduling/application/use-cases/errors/user-not-found-erro'

const createScheduleBodySchema = z.object({
  date: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createScheduleBodySchema)

type CreateScheduleBodySchema = z.infer<typeof createScheduleBodySchema>

@Controller()
export class GetAvailableSlotsController {
  constructor(private getAvailableSlots: GetAvailableSlotsForDayUseCase) {}

  @Get('/schedules')
  @HttpCode(200)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateScheduleBodySchema,
  ) {
    const { sub: userId } = user
    const { date } = body

    const result = await this.getAvailableSlots.execute({
      userId,
      date,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const availableSlots = result.value.availableSlots

    return {
      availableSlots,
    }
  }
}
