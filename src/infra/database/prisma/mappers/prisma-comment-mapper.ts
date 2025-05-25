import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment } from '@/domain/barbershop-scheduling/enterprise/entities/comment'
import { Prisma, Comment as PrismaComment } from '@prisma/client'

export class PrismaCommentMapper {
  static toDomain(raw: PrismaComment): Comment {
    return Comment.create(
      {
        clientId: new UniqueEntityID(raw.userId),
        content: raw.content,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(comment: Comment): Prisma.CommentUncheckedCreateInput {
    return {
      id: comment.id.toString(),
      userId: comment.clientId.toString(),
      content: comment.content,
      createdAt: comment.createdAt,
    }
  }
}
