import { faker } from '@faker-js/faker'
import {
  Comment,
  type CommentProps,
} from '@/domain/barbershop-scheduling/enterprise/entities/comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeComment(
  override: Partial<CommentProps> = {},
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
