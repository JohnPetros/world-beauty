import { CustomersFaker, ProductsFaker, ServicesFaker } from '@world-beauty/core/fakers'
import { customersRepository, productsRepository, servicesRepository } from '..'
import { faker } from '@faker-js/faker'

export const Seed = async () => {
  const fakeProducts = ProductsFaker.fakeMany(20)
  productsRepository.removeAll()
  for (const fakeProduct of fakeProducts) {
    await productsRepository.add(fakeProduct)
  }

  const fakeServices = ServicesFaker.fakeMany(10)
  console.log(fakeServices.length)
  servicesRepository.removeAll()
  for (const fakeProduct of fakeServices) {
    await servicesRepository.add(fakeProduct)
  }

  customersRepository.removeAll()
  for (let index = 0; index < 30; index++) {
    const customersfakeProducts = []
    for (let index = 0; index < faker.number.int({ min: 0, max: 10 }); index++) {
      customersfakeProducts.push(fakeProducts[index])
    }

    const customersfakeServices = []
    for (let index = 0; index < faker.number.int({ min: 0, max: 5 }); index++) {
      customersfakeServices.push(fakeServices[index])
    }

    await customersRepository.add(
      CustomersFaker.fake({
        consumedProducts: customersfakeProducts.map((fakeProduct) => fakeProduct.dto),
        consumedServices: customersfakeServices.map((fakeService) => fakeService.dto),
      }),
    )
  }
}
