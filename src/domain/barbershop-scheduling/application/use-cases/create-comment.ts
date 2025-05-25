import { Comment } from '@/domain/barbershop-scheduling/enterprise/entities/comment'
import { left, right, type Either } from '@/core/either'
import { CommentsRepository } from '../repositories/comments-repository'
import { ClientNotFoundError } from './errors/client-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ClientsRepository } from '../repositories/clients-repository'
import { Injectable } from '@nestjs/common'

interface CreateCommentUseCaseRequest {
  clientId: string
  content: string
}

type CreateCommentUseCaseResponse = Either<ClientNotFoundError, null>

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private clientsRepository: ClientsRepository,
  ) {}

  async execute({
    clientId,
    content,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const comment = Comment.create({
      clientId: new UniqueEntityID(clientId),
      content,
    })

    const doesClientExists = await this.clientsRepository.findById(clientId)

    if (!doesClientExists) {
      return left(new ClientNotFoundError())
    }

    await this.commentsRepository.create(comment)

    return right(null)
  }
}
