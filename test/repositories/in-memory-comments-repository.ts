import type { CommentsRepository } from '@/domain/barbershop-scheduling/application/repositories/comments-repository'
import type { Comment } from '@/domain/barbershop-scheduling/enterprise/entities/comment'

export class InMemoryCommentsRepository implements CommentsRepository {
  public items: Comment[] = []

  async create(comment: Comment): Promise<void> {
    this.items.push(comment)
  }

  async findById(commentId: string): Promise<Comment | null> {
    const comment = this.items.find((item) => item.id.toString() === commentId)

    if (!comment) {
      return null
    }

    return comment
  }

  async delete(commentId: string): Promise<void> {
    this.items.filter((item) => item.id.toString() !== commentId)
  }
}
