import type { Barber } from '../../enterprise/entities/barber'

export abstract class BarbersRepository {
  abstract create(barber: Barber): Promise<void>
  abstract findById(barberId: string): Promise<Barber | null>
  abstract findByEmail(email: string): Promise<Barber | null>
}
