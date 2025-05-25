import { faker } from '@faker-js/faker'
import { UserRoot } from '@/domain/barbershop-scheduling/enterprise/entities/user-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { UserRootProps } from '@/domain/barbershop-scheduling/enterprise/entities/user-root'

export function makeUser(
  override: Partial<UserRootProps> = {},
  id?: UniqueEntityID,
) {
  const user = UserRoot.create(
    {
      name: faker.lorem.word(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      whatsapp_number: String(faker.number.int(8)),
      role: 'CLIENT',
      ...override,
    },
    id,
  )

  return user
}
