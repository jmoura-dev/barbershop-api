import type { Client } from '../../enterprise/entities/client'

export interface ClientsRepository {
  create(client: Client): Promise<void>
  findById(clientId: string): Promise<Client | null>
  findByEmail(email: string): Promise<Client | null>
}
