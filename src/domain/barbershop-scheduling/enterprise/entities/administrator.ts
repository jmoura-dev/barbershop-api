import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserRootProps, UserRoot } from './user-root'

export class Administrator extends UserRoot {
  static create(props: UserRootProps, id?: UniqueEntityID) {
    const administrator = new Administrator(
      {
        ...props,
        role: 'Administrator',
      },
      id,
    )

    return administrator
  }
}
