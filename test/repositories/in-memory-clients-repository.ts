import type { ClientsRepository } from '@/domain/barbershop-scheduling/application/repositories/clients-repository'
import type { Client } from '@/domain/barbershop-scheduling/enterprise/entities/client'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async create(client: Client): Promise<void> {
    this.items.push(client)
  }

  async findById(clientId: string): Promise<Client | null> {
    const client = this.items.find((item) => item.id.toString() === clientId)

    if (!client) {
      return null
    }

    return client
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = this.items.find((item) => item.email === email)

    if (!client) {
      return null
    }

    return client
  }
}
