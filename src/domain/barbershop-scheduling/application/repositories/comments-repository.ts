import type { Comment } from '../../enterprise/entities/comment'

export interface CommentsRepository {
  create(comment: Comment): Promise<void>
  findById(commentId: string): Promise<Comment | null>
  delete(commentId: string): Promise<void>
}
