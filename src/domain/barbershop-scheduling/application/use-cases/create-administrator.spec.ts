import { InMemoryAdministratorsRepository } from 'test/repositories/in-memory-administrators-repository'
import { CreateAdministratorUseCase } from './create-administrator'
import { makeAdministrator } from 'test/factories/make-administrator'
import { EmailAlreadyExists } from './errors/email-already-exists'

let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
let sut: CreateAdministratorUseCase

describe('Create administrator use case', () => {
  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    sut = new CreateAdministratorUseCase(inMemoryAdministratorsRepository)
  })

  it('should be able to create a new administrator', async () => {
    const administrator = makeAdministrator({
      name: 'Jackson',
      email: 'jackson@email.com',
      password_hash: '123456',
    })

    const result = await sut.execute({
      name: administrator.name,
      email: administrator.email,
      password: administrator.password_hash,
      whatsapp_number: administrator.whatsapp_number,
      role: administrator.role,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAdministratorsRepository.items[0]).toMatchObject({
      name: 'Jackson',
      email: 'jackson@email.com',
      role: 'Administrator',
    })
  })

  it('should not be able to create an new administrator with same e-mail', async () => {
    const administrator = makeAdministrator({
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: '123456',
    })

    inMemoryAdministratorsRepository.items.push(administrator)

    const result = await sut.execute({
      name: 'Jão',
      email: administrator.email,
      password: '654321',
      whatsapp_number: '123456',
      role: 'administrator',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(EmailAlreadyExists)
  })
})
