import type { BarbersRepository } from '@/domain/barbershop-scheduling/application/repositories/barbers-repository'
import type { Barber } from '@/domain/barbershop-scheduling/enterprise/entities/barber'

export class InMemoryBarbersRepository implements BarbersRepository {
  public items: Barber[] = []

  async create(barber: Barber): Promise<void> {
    this.items.push(barber)
  }

  async findById(barberId: string): Promise<Barber | null> {
    const barber = this.items.find((item) => item.id.toString() === barberId)

    if (!barber) {
      return null
    }

    return barber
  }

  async findByEmail(email: string): Promise<Barber | null> {
    const barber = this.items.find((item) => item.email === email)

    if (!barber) {
      return null
    }

    return barber
  }
}
