import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserRootProps, UserRoot } from './user-root'

export class Client extends UserRoot {
  static create(props: UserRootProps, id?: UniqueEntityID) {
    const client = new Client(
      {
        ...props,
        role: 'client',
      },
      id,
    )

    return client
  }
}
