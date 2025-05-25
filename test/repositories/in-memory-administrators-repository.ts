import type { AdministratorsRepository } from '@/domain/barbershop-scheduling/application/repositories/administrators-repository'
import type { Administrator } from '@/domain/barbershop-scheduling/enterprise/entities/administrator'

export class InMemoryAdministratorsRepository
  implements AdministratorsRepository
{
  public items: Administrator[] = []

  async create(administrator: Administrator): Promise<void> {
    this.items.push(administrator)
  }

  async findById(administratorId: string): Promise<Administrator | null> {
    const administrator = this.items.find(
      (item) => item.id.toString() === administratorId,
    )

    if (!administrator) {
      return null
    }

    return administrator
  }

  async findByEmail(email: string): Promise<Administrator | null> {
    const administrator = this.items.find((item) => item.email === email)

    if (!administrator) {
      return null
    }

    return administrator
  }
}
