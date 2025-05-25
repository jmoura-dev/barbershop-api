import { faker } from '@faker-js/faker'
import { Administrator } from '@/domain/barbershop-scheduling/enterprise/entities/administrator'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { UserRootProps } from '@/domain/barbershop-scheduling/enterprise/entities/user-root'

export function makeAdministrator(
  override: Partial<UserRootProps> = {},
  id?: UniqueEntityID,
) {
  const administrator = Administrator.create(
    {
      name: faker.lorem.word(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      whatsapp_number: String(faker.number.int(8)),
      role: 'Administrator',
      ...override,
    },
    id,
  )

  return administrator
}
