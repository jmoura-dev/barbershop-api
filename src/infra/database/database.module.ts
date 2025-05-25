import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { UsersRepository } from '@/domain/barbershop-scheduling/application/repositories/users-repository'
import { SchedulesRepository } from '@/domain/barbershop-scheduling/application/repositories/schedules-repository'
import { PrismaSchedulesRepository } from './prisma/repositories/prisma-schedule-repository'
import { CommentsRepository } from '@/domain/barbershop-scheduling/application/repositories/comments-repository'
import { PrismaCommentsRepository } from './prisma/repositories/prisma-comments-repository'
import { ClientsRepository } from '@/domain/barbershop-scheduling/application/repositories/clients-repository'
import { AdministratorsRepository } from '@/domain/barbershop-scheduling/application/repositories/administrators-repository'
import { BarbersRepository } from '@/domain/barbershop-scheduling/application/repositories/barbers-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: AdministratorsRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: BarbersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ClientsRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: SchedulesRepository,
      useClass: PrismaSchedulesRepository,
    },
    {
      provide: CommentsRepository,
      useClass: PrismaCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    AdministratorsRepository,
    BarbersRepository,
    ClientsRepository,
    SchedulesRepository,
    CommentsRepository,
  ],
})
export class DatabaseModule {}
