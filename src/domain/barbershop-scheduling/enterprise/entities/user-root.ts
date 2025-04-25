import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserRootProps {
  name: string
  email: string
  password: string
  whatsapp_number: string
  role: string
}

export class UserRoot extends Entity<UserRootProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get whatsapp_number() {
    return this.props.whatsapp_number
  }

  set whatsapp_number(whatsapp_number: string) {
    this.props.whatsapp_number = whatsapp_number
  }

  get role() {
    return this.props.role
  }

  set role(role: string) {
    this.props.role = role
  }

  static create(props: UserRootProps, id?: UniqueEntityID) {
    const user = new UserRoot(
      {
        ...props,
      },
      id,
    )

    return user
  }
}
