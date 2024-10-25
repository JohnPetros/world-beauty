import { fakerPT_BR as faker } from '@faker-js/faker'
import { Address } from '../../domain/structs'

export class AddressesFaker {
  static fake() {
    return Address.create({
      state: faker.location.state(),
      city: faker.location.city(),
      neighborhood: faker.location.county(),
      number: faker.number.int({ min: 1, max: 9999 }),
      zipcode: faker.location.zipCode(),
      complement: faker.location.secondaryAddress(),
    })
  }

  static fakeMany(count: number) {
    return Array.from({ length: count }).map(() => AddressesFaker.fake())
  }
}
