import { faker } from '@faker-js/faker'
import { Client } from '@/domain/barbershop-scheduling/enterprise/entities/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { UserRootProps } from '@/domain/barbershop-scheduling/enterprise/entities/user-root'

export function makeClient(
  override: Partial<UserRootProps> = {},
  id?: UniqueEntityID,
) {
  const client = Client.create(
    {
      name: faker.lorem.word(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      whatsapp_number: String(faker.number.int(8)),
      role: 'client',
      ...override,
    },
    id,
  )

  return client
}
