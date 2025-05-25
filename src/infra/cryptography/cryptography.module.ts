import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

import { Encrypter } from '@/domain/barbershop-scheduling/application/cryptography/encrypter'
import { HashGenerator } from '@/domain/barbershop-scheduling/application/cryptography/hash-generator'
import { HashComparer } from '@/domain/barbershop-scheduling/application/cryptography/hash-comparer'

import { Module } from '@nestjs/common'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
