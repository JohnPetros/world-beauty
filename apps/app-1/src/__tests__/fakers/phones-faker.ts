import { Phone } from '../../core/entities'
import { fakerPT_BR as faker } from '@faker-js/faker'

export class PhonesFaker {
  static fake() {
    return new Phone(
      faker.number.int({ min: 1, max: 99 }).toString(),
      faker.phone.number(),
    )
  }

  static fakeMany(count: number) {
    return Array.from({ length: count }).map(() => PhonesFaker.fake())
  }
}
