import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ScheduleProps {
  clientId: UniqueEntityID
  date: string
  time: string
  cutValue: number
  status: boolean
  typeOfCut: string
  createdAt: Date
}

export class Schedule extends Entity<ScheduleProps> {
  get clientId() {
    return this.props.clientId
  }

  get date() {
    return this.props.date
  }

  set date(date: string) {
    this.props.date = date
  }

  get time() {
    return this.props.time
  }

  set time(time: string) {
    this.props.time = time
  }

  get cutValue() {
    return this.props.cutValue
  }

  set cutValue(cutValue: number) {
    this.props.cutValue = cutValue
  }

  get status() {
    return this.props.status
  }

  set status(status: boolean) {
    this.props.status = status
  }

  get typeOfCut() {
    return this.props.typeOfCut
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ScheduleProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const schedule = new Schedule(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return schedule
  }
}
