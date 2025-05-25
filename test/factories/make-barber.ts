import { faker } from '@faker-js/faker'
import { Barber } from '@/domain/barbershop-scheduling/enterprise/entities/barber'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { UserRootProps } from '@/domain/barbershop-scheduling/enterprise/entities/user-root'

export function makeBarber(
  override: Partial<UserRootProps> = {},
  id?: UniqueEntityID,
) {
  const barber = Barber.create(
    {
      name: faker.lorem.word(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      whatsapp_number: String(faker.number.int(8)),
      role: 'barber',
      ...override,
    },
    id,
  )

  return barber
}
