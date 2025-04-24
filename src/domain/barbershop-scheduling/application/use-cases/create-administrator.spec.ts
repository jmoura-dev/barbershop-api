import { InMemoryAdministratorsRepository } from 'test/repositories/in-memory-administrators-repository'
import { CreateAdministratorUseCase } from './create-administrator'
import { makeAdministrator } from 'test/factories/make-administrator'

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
      password: '123456',
    })

    const result = await sut.execute({
      name: administrator.name,
      email: administrator.email,
      password: administrator.password,
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
})
