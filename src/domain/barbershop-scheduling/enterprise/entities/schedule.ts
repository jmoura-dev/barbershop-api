import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ScheduleProps {
  clientId: UniqueEntityID
  appointmentTime: string
  cutValue: number
  status: boolean
  typeOfCut: string
  createdAt: Date
}

export class Schedule extends Entity<ScheduleProps> {
  get clientId() {
    return this.props.clientId
  }

  get appointmentTime() {
    return this.props.appointmentTime
  }

  set appointmentTime(appointmentTime: string) {
    this.props.appointmentTime = appointmentTime
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
