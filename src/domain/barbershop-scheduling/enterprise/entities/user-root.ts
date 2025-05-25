import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export interface UserRootProps {
  name: string
  email: string
  password_hash: string
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

  get password_hash() {
    return this.props.password_hash
  }

  set password_hash(password_hash: string) {
    this.props.password_hash = password_hash
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

  static create(props: Optional<UserRootProps, 'role'>, id?: UniqueEntityID) {
    const user = new UserRoot(
      {
        ...props,
        role: props.role ?? 'CLIENT',
      },
      id,
    )

    return user
  }
}
