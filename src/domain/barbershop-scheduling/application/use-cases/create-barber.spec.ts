import { InMemoryBarbersRepository } from 'test/repositories/in-memory-barbers-repository'
import { CreateBarberUseCase } from './create-barber'
import { makeBarber } from 'test/factories/make-barber'
import { EmailAlreadyExists } from './errors/email-already-exists'

let inMemoryBarbersRepository: InMemoryBarbersRepository
let sut: CreateBarberUseCase

describe('Create barber use case', () => {
  beforeEach(() => {
    inMemoryBarbersRepository = new InMemoryBarbersRepository()
    sut = new CreateBarberUseCase(inMemoryBarbersRepository)
  })

  it('should be able to create a new barber', async () => {
    const barber = makeBarber({
      name: 'Jackson',
      email: 'jackson@email.com',
      password_hash: '123456',
    })

    const result = await sut.execute({
      name: barber.name,
      email: barber.email,
      password: barber.password_hash,
      whatsapp_number: barber.whatsapp_number,
      role: barber.role,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBarbersRepository.items[0]).toMatchObject({
      name: 'Jackson',
      email: 'jackson@email.com',
      role: 'barber',
    })
  })

  it('should not be able to create an new barber with same e-mail', async () => {
    const barber = makeBarber({
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: '123456',
    })

    inMemoryBarbersRepository.items.push(barber)

    const result = await sut.execute({
      name: 'Jão',
      email: barber.email,
      password: '654321',
      whatsapp_number: '123456',
      role: 'barber',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(EmailAlreadyExists)
  })
})
