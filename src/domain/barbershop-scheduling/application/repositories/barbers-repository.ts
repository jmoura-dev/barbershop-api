import type { Barber } from '../../enterprise/entities/barber'

export interface BarbersRepository {
  create(barber: Barber): Promise<void>
  findById(barberId: string): Promise<Barber | null>
  findByEmail(email: string): Promise<Barber | null>
}
