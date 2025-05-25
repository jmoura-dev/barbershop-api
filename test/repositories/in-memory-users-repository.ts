import type { UsersRepository } from '@/domain/barbershop-scheduling/application/repositories/users-repository'
import { UserRoot } from '@/domain/barbershop-scheduling/enterprise/entities/user-root'

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserRoot[] = []

  async create(user: UserRoot): Promise<void> {
    this.items.push(user)
  }

  async findById(userId: string): Promise<UserRoot | null> {
    const user = this.items.find((item) => item.id.toString() === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<UserRoot | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
