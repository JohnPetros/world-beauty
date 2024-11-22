import { faker } from '@faker-js/faker'

import { CustomersFaker, ProductsFaker, ServicesFaker } from '@world-beauty/core/fakers'
import { Order } from '@world-beauty/core/structs'
import {
  productsRepository,
  servicesRepository,
  customersRepository,
  ordersRepository,
} from '..'

export async function seed() {
  await Promise.all([
    productsRepository.removeAll(),
    customersRepository.removeAll(),
    ordersRepository.removeAll(),
    servicesRepository.removeAll(),
  ])

  const fakeProducts = ProductsFaker.fakeMany(20)
  const fakeServices = ServicesFaker.fakeMany(10)

  const fakeCustomers = []
  const fakeOrders = []

  for (let index = 0; index < 30; index++) {
    const fakeCustomer = CustomersFaker.fake()

    for (let index = 0; index < faker.number.int({ min: 0, max: 10 }); index++) {
      const fakeProduct =
        fakeProducts[faker.number.int({ min: 0, max: fakeProducts.length - 1 })]
      const order = Order.create({
        customerId: fakeCustomer.id,
        amount: fakeProduct.price,
        itemId: fakeProduct.id,
      })
      fakeOrders.push(order)
    }

    for (let index = 0; index < faker.number.int({ min: 0, max: 5 }); index++) {
      const fakeService =
        fakeServices[faker.number.int({ min: 0, max: fakeServices.length - 1 })]
      const order = Order.create({
        customerId: fakeCustomer.id,
        amount: fakeService.price,
        itemId: fakeService.id,
      })
      fakeOrders.push(order)
    }

    fakeCustomers.push(fakeCustomer)
  }

  await Promise.all([
    customersRepository.addMany(fakeCustomers),
    productsRepository.addMany(fakeProducts),
    servicesRepository.addMany(fakeServices),
  ])

  await ordersRepository.addMany(fakeOrders)
}

seed().then(() => {
  console.log('Database seeded 🌱')
})
