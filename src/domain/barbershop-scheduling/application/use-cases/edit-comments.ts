import { left, right, type Either } from '@/core/either'
import { CommentsRepository } from '../repositories/comments-repository'
import { ClientNotFoundError } from './errors/client-not-found-error'
import { UsersRepository } from '../repositories/users-repository'

interface EditCommentUseCaseRequest {
  userId: string
  commentId: string
  content?: string
}

type EditCommentUseCaseResponse = Either<ClientNotFoundError, null>

export class EditCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    commentId,
    content,
  }: EditCommentUseCaseRequest): Promise<EditCommentUseCaseResponse> {
    const comment = await this.commentsRepository.findById(commentId)

    if (!comment) {
      return left(new Error('Comment not found'))
    }

    const doesUserExists = await this.usersRepository.findById(userId)

    if (!doesUserExists) {
      return left(new ClientNotFoundError())
    }

    comment.content = content ?? comment.content

    await this.commentsRepository.update(comment)

    return right(null)
  }
}
