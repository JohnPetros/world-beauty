import { CustomersFaker, ProductsFaker, ServicesFaker } from '@world-beauty/core/fakers'
import { customersRepository, productsRepository, servicesRepository } from '..'

export const Seed = async () => {
  const fakeCustomers = CustomersFaker.fakeMany(30)

  customersRepository.removeAll()
  for (const fakeCustomer of fakeCustomers) {
    await customersRepository.add(fakeCustomer)
  }

  const fakeProducts = ProductsFaker.fakeMany(20)
  productsRepository.removeAll()
  for (const fakeProduct of fakeProducts) {
    await productsRepository.add(fakeProduct)
  }

  const fakeServices = ServicesFaker.fakeMany(10)
  servicesRepository.removeAll()
  for (const fakeProduct of fakeServices) {
    await servicesRepository.add(fakeProduct)
  }
}
