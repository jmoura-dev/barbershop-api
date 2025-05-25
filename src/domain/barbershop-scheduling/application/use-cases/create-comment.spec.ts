import { InMemoryCommentsRepository } from 'test/repositories/in-memory-comments-repository'
import { CreateCommentUseCase } from './create-comment'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'
import { makeClient } from 'test/factories/make-client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ClientNotFoundError } from './errors/client-not-found-error'

let inMemoryCommentsRepository: InMemoryCommentsRepository
let inMemoryClientsRepository: InMemoryClientsRepository
let sut: CreateCommentUseCase

describe('Create a new comment', () => {
  beforeEach(() => {
    inMemoryCommentsRepository = new InMemoryCommentsRepository()
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new CreateCommentUseCase(
      inMemoryCommentsRepository,
      inMemoryClientsRepository,
    )
  })

  it('should be able to create a new comment', async () => {
    const client = makeClient({
      name: 'Jackson',
      email: 'jackson@email.com',
      password_hash: '123456',
    })

    inMemoryClientsRepository.items.push(client)

    await sut.execute({
      clientId: client.id.toString(),
      content: 'This barbershop is really good.',
    })

    expect(inMemoryCommentsRepository.items.length).toEqual(1)
    expect(inMemoryCommentsRepository.items[0]).toMatchObject({
      clientId: client.id,
      content: 'This barbershop is really good.',
    })
  })

  it('should not be able to create a new barber with invalid client', async () => {
    const client = makeClient(
      {
        name: 'Jackson',
        email: 'jackson@email.com',
        password_hash: '123456',
      },
      new UniqueEntityID('client-01'),
    )

    inMemoryClientsRepository.items.push(client)

    const result = await sut.execute({
      clientId: 'client-02',
      content: 'This barbershop is really good.',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ClientNotFoundError)
  })
})
