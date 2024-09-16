import { CustomersFaker } from '@world-beauty/core/fakers'
import { customersRepository } from '..'

export const Seed = async () => {
  const fakeCustomers = CustomersFaker.fakeManyDto(20)

  customersRepository.removeAll()
  for (const fakeCustomer of fakeCustomers) {
    await customersRepository.add(fakeCustomer)
  }
}
