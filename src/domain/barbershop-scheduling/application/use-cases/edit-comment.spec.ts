import { InMemoryCommentsRepository } from 'test/repositories/in-memory-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ClientNotFoundError } from './errors/client-not-found-error'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { EditCommentUseCase } from './edit-comments'
import { makeComment } from 'test/factories/make-comment'

let inMemoryCommentsRepository: InMemoryCommentsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditCommentUseCase

describe('Edit content at comment', () => {
  beforeEach(() => {
    inMemoryCommentsRepository = new InMemoryCommentsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditCommentUseCase(
      inMemoryCommentsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to edit an comment', async () => {
    const user = makeUser({
      name: 'Jackson',
      email: 'jackson@email.com',
      password_hash: '123456',
    })

    inMemoryUsersRepository.items.push(user)

    const comment = makeComment({
      clientId: user.id,
      content: 'This barbershop is really good.',
    })

    inMemoryCommentsRepository.items.push(comment)

    await sut.execute({
      userId: user.id.toString(),
      commentId: comment.id.toString(),
      content: 'This barbershop do not good.',
    })

    expect(inMemoryCommentsRepository.items.length).toEqual(1)
    expect(inMemoryCommentsRepository.items[0]).toMatchObject({
      clientId: user.id,
      content: 'This barbershop do not good.',
    })
  })

  it('should not be able to create a new barber with invalid client', async () => {
    const user = makeUser(
      {
        name: 'Jackson',
        email: 'jackson@email.com',
        password_hash: '123456',
      },
      new UniqueEntityID('client-01'),
    )

    inMemoryUsersRepository.items.push(user)

    const comment = makeComment({
      clientId: user.id,
      content: 'This barbershop is really good.',
    })

    inMemoryCommentsRepository.items.push(comment)

    const result = await sut.execute({
      userId: 'client-02',
      commentId: comment.id.toString(),
      content: 'This barbershop is really good.',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ClientNotFoundError)
  })
})
