import { HashComparer } from '@/domain/barbershop-scheduling/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/barbershop-scheduling/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(password: string): Promise<string> {
    return password.concat('-hashed')
  }

  async compare(password: string, passwordHashed: string): Promise<boolean> {
    return password.concat('-hashed') === passwordHashed
  }
}
