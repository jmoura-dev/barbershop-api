import type { UseCaseError } from '@/core/errors/use-case-error'

export class TimeSlotIsNotAvailable extends Error implements UseCaseError {
  constructor(time: string) {
    super(`This time: ${time} is not available.`)
  }
}
