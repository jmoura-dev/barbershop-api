import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateClientUseCase } from '@/domain/barbershop-scheduling/application/use-cases/create-client'
import { AuthenticateUserUseCase } from '@/domain/barbershop-scheduling/application/use-cases/authenticate-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateAdministratorUseCase } from '@/domain/barbershop-scheduling/application/use-cases/create-administrator'
import { CreateBarberUseCase } from '@/domain/barbershop-scheduling/application/use-cases/create-barber'
import { CreateCommentUseCase } from '@/domain/barbershop-scheduling/application/use-cases/create-comment'
import { CreateScheduleUseCase } from '@/domain/barbershop-scheduling/application/use-cases/create-schedule'
import { RegisterUserUseCase } from '@/domain/barbershop-scheduling/application/use-cases/register-user'
import { CreateScheduleController } from './controllers/create-schedule.controller'
import { GetAvailableSlotsForDayUseCase } from '@/domain/barbershop-scheduling/application/use-cases/get-available-slots-for-day'
import { GetAvailableSlotsController } from './controllers/get-available-slots.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateScheduleController,
    GetAvailableSlotsController,
  ],
  providers: [
    PrismaService,
    CreateClientUseCase,
    AuthenticateUserUseCase,
    CreateAdministratorUseCase,
    CreateBarberUseCase,
    CreateCommentUseCase,
    CreateScheduleUseCase,
    RegisterUserUseCase,
    GetAvailableSlotsForDayUseCase,
  ],
})
export class HttpModule {}
