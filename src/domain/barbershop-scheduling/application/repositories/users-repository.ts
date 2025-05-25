import { UserRoot } from '../../enterprise/entities/user-root'

export abstract class UsersRepository {
  abstract create(user: UserRoot): Promise<void>
  abstract findById(userId: string): Promise<UserRoot | null>
  abstract findByEmail(email: string): Promise<UserRoot | null>
}
