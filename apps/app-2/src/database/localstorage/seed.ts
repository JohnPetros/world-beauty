import { CustomersFaker, ProductsFaker } from '@world-beauty/core/fakers'
import { customersRepository, productsRepository } from '..'

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
}
