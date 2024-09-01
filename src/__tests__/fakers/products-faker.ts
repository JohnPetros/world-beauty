import { Product } from '@/core/entities'
import { fakerPT_BR as faker } from '@faker-js/faker'

export class ProductsFaker {
  static fake() {
    return new Product({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
    })
  }

  static fakeMany(count: number) {
    return Array.from({ length: count }).map(() => ProductsFaker.fake())
  }
}
