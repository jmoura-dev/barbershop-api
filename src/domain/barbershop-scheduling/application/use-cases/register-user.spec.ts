import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user'
import { makeUser } from 'test/factories/make-user'
import { EmailAlreadyExists } from './errors/email-already-exists'
import { FakeHasher } from 'test/cryptograph/fake-hasher'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to create a new user', async () => {
    const user = makeUser({
      name: 'Jackson',
      email: 'jackson@email.com',
      password_hash: '123456',
    })

    const result = await sut.execute({
      name: user.name,
      email: user.email,
      password: user.password_hash,
      whatsapp_number: user.whatsapp_number,
      role: user.role,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      name: 'Jackson',
      email: 'jackson@email.com',
      role: 'CLIENT',
    })
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John doe',
      email: 'foo@example.com',
      password: '123456',
      whatsapp_number: '88888888',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].password_hash).toEqual(
      hashedPassword,
    )
  })

  it('should not be able to create an new user with same e-mail', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: '123456',
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      name: 'Jão',
      email: user.email,
      password: '654321',
      whatsapp_number: '123456',
      role: 'user',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(EmailAlreadyExists)
  })
})
