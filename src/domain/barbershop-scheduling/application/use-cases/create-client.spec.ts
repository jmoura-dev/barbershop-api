import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'
import { CreateClientUseCase } from './create-client'
import { makeClient } from 'test/factories/make-client'
import { EmailAlreadyExists } from './errors/email-already-exists'

let inMemoryClientsRepository: InMemoryClientsRepository
let sut: CreateClientUseCase

describe('Create client use case', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new CreateClientUseCase(inMemoryClientsRepository)
  })

  it('should be able to create a new client', async () => {
    const client = makeClient({
      name: 'Jackson',
      email: 'jackson@email.com',
      password_hash: '123456',
    })

    const result = await sut.execute({
      name: client.name,
      email: client.email,
      password: client.password_hash,
      whatsapp_number: client.whatsapp_number,
      role: client.role,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryClientsRepository.items[0]).toMatchObject({
      name: 'Jackson',
      email: 'jackson@email.com',
      role: 'client',
    })
  })

  it('should not be able to create an new client with same e-mail', async () => {
    const client = makeClient({
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: '123456',
    })

    inMemoryClientsRepository.items.push(client)

    const result = await sut.execute({
      name: 'Jão',
      email: client.email,
      password: '654321',
      whatsapp_number: '123456',
      role: 'client',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(EmailAlreadyExists)
  })
})
