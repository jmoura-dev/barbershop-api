import { Comment } from '@/domain/barbershop-scheduling/enterprise/entities/comment'
import { left, right, type Either } from '@/core/either'
import type { CommentsRepository } from '../repositories/comments-repository'
import { ClientNotFoundError } from './errors/client-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateCommentUseCaseRequest {
  clientId: string
  content: string
}

type CreateCommentUseCaseResponse = Either<ClientNotFoundError, null>

export class CreateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    clientId,
    content,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const comment = Comment.create({
      clientId: new UniqueEntityID(clientId),
      content,
    })

    const doesClientExists = await this.commentsRepository.findById(clientId)

    if (!doesClientExists) {
      return left(new ClientNotFoundError())
    }

    await this.commentsRepository.create(comment)

    return right(null)
  }
}
