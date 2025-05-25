import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CommentProps {
  clientId: UniqueEntityID
  content: string
  createdAt: Date
}

export class Comment extends Entity<CommentProps> {
  get clientId() {
    return this.props.clientId
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<CommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const comment = new Comment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return comment
  }
}
