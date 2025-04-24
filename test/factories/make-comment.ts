import { faker } from '@faker-js/faker'
import { Comment } from '@/domain/barbershop-scheduling/enterprise/entities/comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { UserRootProps } from '@/domain/barbershop-scheduling/enterprise/entities/user-root'

export function makeComment(
  override: Partial<UserRootProps> = {},
  id?: UniqueEntityID,
) {
  const comment = Comment.create(
    {
      clientId: new UniqueEntityID(),
      content: faker.lorem.sentence(5),
      ...override,
    },
    id,
  )

  return comment
}
