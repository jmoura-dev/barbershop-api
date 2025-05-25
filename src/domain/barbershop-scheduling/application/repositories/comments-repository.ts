import type { Comment } from '../../enterprise/entities/comment'

export abstract class CommentsRepository {
  abstract create(comment: Comment): Promise<void>
  abstract findById(commentId: string): Promise<Comment | null>
  abstract delete(commentId: string): Promise<void>
  abstract update(comment: Comment): Promise<void>
}
