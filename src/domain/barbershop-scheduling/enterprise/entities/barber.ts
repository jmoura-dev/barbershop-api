import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserRootProps, UserRoot } from './user-root'

export class Barber extends UserRoot {
  static create(props: UserRootProps, id?: UniqueEntityID) {
    const barber = new Barber(
      {
        ...props,
        role: 'barber',
      },
      id,
    )

    return barber
  }
}
