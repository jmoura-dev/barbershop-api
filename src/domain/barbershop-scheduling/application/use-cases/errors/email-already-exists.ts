import type { UseCaseError } from '@/core/errors/use-case-error'

export class EmailAlreadyExists extends Error implements UseCaseError {
  constructor(email: string) {
    super(`E-mail address ${email} already exists in the database.`)
  }
}
