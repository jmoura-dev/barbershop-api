import { ClientsRepository } from '@/domain/barbershop-scheduling/application/repositories/clients-repository'
import type { Client } from '@/domain/barbershop-scheduling/enterprise/entities/client'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaUsersRepository implements ClientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(client: Client): Promise<void> {
    const data = PrismaUserMapper.toPrisma(client)

    await this.prisma.user.create({
      data,
    })
  }

  async findById(clientId: string): Promise<Client | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: clientId,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<Client | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
