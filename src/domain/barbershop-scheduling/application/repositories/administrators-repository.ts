import type { Administrator } from '../../enterprise/entities/administrator'

export interface AdministratorsRepository {
  create(administrator: Administrator): Promise<void>
  findById(administratorId: string): Promise<Administrator | null>
  findByEmail(email: string): Promise<Administrator | null>
}
