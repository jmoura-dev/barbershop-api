import { Administrator } from '../../enterprise/entities/administrator'

export abstract class AdministratorsRepository {
  abstract create(administrator: Administrator): Promise<void>
  abstract findById(administratorId: string): Promise<Administrator | null>
  abstract findByEmail(email: string): Promise<Administrator | null>
}
