import { Service } from '@/core/entities'
import { fakerPT_BR as faker } from '@faker-js/faker'

export class ServicesFaker {
  static fake() {
    return new Service({
      name: faker.company.name(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription().slice(0, 50),
    })
  }

  static fakeMany(count: number) {
    return Array.from({ length: count }).map(() => ServicesFaker.fake())
  }
}
