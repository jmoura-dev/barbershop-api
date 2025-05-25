import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Client } from '@/domain/barbershop-scheduling/enterprise/entities/client'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): Client {
    return Client.create(
      {
        name: raw.name,
        email: raw.email,
        password_hash: raw.password_hash,
        whatsapp_number: raw.whatsapp_number,
        role: raw.role,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: Client): Prisma.UserCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      whatsapp_number: user.whatsapp_number,
      role: user.role ? 'CLIENT' : undefined,
    }
  }
}
