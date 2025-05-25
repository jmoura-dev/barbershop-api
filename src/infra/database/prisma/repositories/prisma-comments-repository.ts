import { CommentsRepository } from '@/domain/barbershop-scheduling/application/repositories/comments-repository'
import { Comment } from '@/domain/barbershop-scheduling/enterprise/entities/comment'
import { PrismaCommentMapper } from '../mappers/prisma-comment-mapper'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaCommentsRepository implements CommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(comment: Comment): Promise<void> {
    const data = PrismaCommentMapper.toPrisma(comment)

    await this.prisma.comment.create({
      data,
    })
  }

  async findById(commentId: string): Promise<Comment | null> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    })

    if (!comment) {
      return null
    }

    return PrismaCommentMapper.toDomain(comment)
  }

  async delete(commentId: string): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    })
  }

  async update(comment: Comment): Promise<void> {
    await this.prisma.comment.update({
      where: {
        id: comment.id.toString(),
      },
      data: {
        content: comment.content,
      },
    })
  }
}
