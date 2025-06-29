import { InMemorySchedulesRepository } from 'test/repositories/in-memory-schedules-repository'
import { CreateScheduleUseCase } from './create-schedule'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'
import { makeClient } from 'test/factories/make-client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ClientNotFoundError } from './errors/client-not-found-error'

let inMemorySchedulesRepository: InMemorySchedulesRepository
let inMemoryClientsRepository: InMemoryClientsRepository
let sut: CreateScheduleUseCase

describe('Create a new schedule', () => {
  beforeEach(() => {
    inMemorySchedulesRepository = new InMemorySchedulesRepository()
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new CreateScheduleUseCase(
      inMemorySchedulesRepository,
      inMemoryClientsRepository,
    )
  })

  it('should be able to create a new schedule', async () => {
    const client = makeClient({
      name: 'Jackson',
      email: 'jackson@email.com',
      password_hash: '123456',
    })

    inMemoryClientsRepository.items.push(client)

    await sut.execute({
      clientId: client.id.toString(),
      date: new Date().toString(),
      time: new Date().getMinutes().toString(),
      cutValue: 30,
      typeOfCut: 'cabelo/barba',
      status: true,
    })

    console.log(inMemorySchedulesRepository.items[0], 'resultado')

    expect(inMemorySchedulesRepository.items.length).toEqual(1)
    expect(inMemorySchedulesRepository.items[0]).toMatchObject({
      clientId: client.id,
      typeOfCut: 'cabelo/barba',
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
      date: new Date().toString(),
      time: new Date().getMinutes().toString(),
      cutValue: 30,
      typeOfCut: 'cabelo/barba',
      status: true,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ClientNotFoundError)
  })
})
